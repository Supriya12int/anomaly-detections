# app.py
# FINAL CLEAN BACKEND (DEPLOY READY)
# Swin Transformer + DINO-ViT Heatmaps + History Saving

import os
import json
import uuid
import base64
import requests
from io import BytesIO
from datetime import datetime

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from PIL import Image
import numpy as np
import cv2

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

import torch
import timm
from torchvision import transforms
import bcrypt

from transformers import ViTModel, ViTImageProcessor

# =======================================================
# CONFIG
# =======================================================
ADMIN_SECRET_CODE = "9999"
MODEL_FILE_ID = "1hC5_x5Xcs7yFR0yhtS1_OCENpLhHs9zI"   # Drive file id - swin_transformer_trained.pth
MODEL_PATH = "swin_transformer_trained.pth"

USER_DB = "users.json"
HISTORY_DB = "user_history.json"

STATIC_HISTORY_DIR = os.path.join("static", "history_images")
os.makedirs(STATIC_HISTORY_DIR, exist_ok=True)

# =======================================================
# FLASK + CORS
# =======================================================
app = Flask(__name__, static_folder="static")
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(resp):
    # Allow multiple origins for development and production
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.environ.get("FRONTEND_URL", "http://localhost:3000"),
    ]
    origin = request.headers.get("Origin")
    if origin in allowed_origins or "*" in os.environ.get("ALLOW_ALL_ORIGINS", ""):
        resp.headers.add("Access-Control-Allow-Origin", origin or "http://localhost:3000")
    resp.headers.add("Access-Control-Allow-Credentials", "true")
    resp.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    resp.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    return resp

# =======================================================
# JSON DB HELPERS
# =======================================================
def ensure_file(path, default):
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(default, f)

ensure_file(USER_DB, [])
ensure_file(HISTORY_DB, {})

def read_users():
    with open(USER_DB, "r", encoding="utf-8") as f:
        return json.load(f)

def write_users(users):
    with open(USER_DB, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=4)

def read_history():
    try:
        with open(HISTORY_DB, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

def write_history(h):
    with open(HISTORY_DB, "w", encoding="utf-8") as f:
        json.dump(h, f, indent=4, ensure_ascii=False)

# =======================================================
# DOWNLOAD MODEL FROM GOOGLE DRIVE (ONLY IF NOT PRESENT)
# robust handling for confirm token and html responses
# =======================================================
def download_file_from_google_drive(file_id, destination):
    if os.path.exists(destination):
        print("[OK] Model already exists - skipping download.")
        return

    print("[DOWNLOADING] Model from Google Drive...")
    
    # Use gdown library which handles Google Drive downloads better
    try:
        import gdown
        url = f"https://drive.google.com/uc?id={file_id}"
        print(f"  Downloading from: {url}")
        gdown.download(url, destination, quiet=False)
        print(f"[OK] Model downloaded successfully to {destination}")
        return
    except ImportError:
        print("  [INFO] gdown not available, trying direct download...")
    except Exception as e:
        print(f"  [WARNING] gdown failed: {e}, trying alternative method...")
    
    # Fallback: Direct download with token bypass
    try:
        URL = f"https://drive.google.com/uc?export=download&id={file_id}"
        session = requests.Session()
        
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = session.get(URL, headers=headers, stream=True, allow_redirects=True, timeout=60)
        
        # Check content type
        content_type = response.headers.get('content-type', '').lower()
        
        if 'text/html' in content_type or 'application/json' in content_type:
            # Try to extract confirmation token from HTML
            import re
            text = response.text
            
            # Look for confirmation token
            m = re.search(r'id=([a-zA-Z0-9_-]+).*confirm=([a-zA-Z0-9_-]+)', text)
            if m:
                token = m.group(2)
                print(f"  Using token: {token}")
                URL_WITH_TOKEN = f"https://drive.google.com/uc?export=download&id={file_id}&confirm={token}"
                response = session.get(URL_WITH_TOKEN, headers=headers, stream=True, allow_redirects=True, timeout=60)
                content_type = response.headers.get('content-type', '').lower()
            else:
                # Try UUID pattern (newer Google Drive)
                m = re.search(r'uuid":"?([a-f0-9\-]+)"?', text)
                if m:
                    raise Exception("File is too large for direct download - please download manually from Google Drive")
        
        # Now download the file
        if 'text/html' in content_type:
            raise Exception("Still receiving HTML - file may not be accessible or sharing settings may be restricted")
        
        total_size = int(response.headers.get('content-length', 0))
        if total_size == 0:
            raise Exception("Could not determine file size")
        
        print(f"  File size: {total_size / (1024*1024):.1f} MB")
        print(f"  Downloading...")
        
        downloaded = 0
        with open(destination, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total_size > 0:
                        progress = (downloaded / total_size) * 100
                        print(f"  Progress: {progress:.1f}%", end='\r')
        
        print(f"\n[OK] Model downloaded successfully!")
        
    except Exception as e:
        print(f"[ERROR] {e}")
        if os.path.exists(destination):
            os.remove(destination)
        raise

# =======================================================
# MODEL LOADING
# - safe fallback: try torch.load normally, then try weights_only=False
# =======================================================
device = torch.device("cpu")

# Download model file only when missing
try:
    download_file_from_google_drive(MODEL_FILE_ID, MODEL_PATH)
except Exception as e:
    app.logger.warning("Model download failed: %s", e)
    app.logger.warning("Make sure the Google Drive file ID is correct and the file is shared publicly")
    app.logger.warning("You can download the model manually and place it as: %s", MODEL_PATH)

app.logger.info("Loading Swin model...")

model = None
try:
    if not os.path.exists(MODEL_PATH):
        app.logger.warning("[MODEL NOT FOUND] %s does not exist", MODEL_PATH)
        app.logger.warning("Download the model from Google Drive and place it in the backend folder")
        app.logger.warning("App will run in DEMO MODE without predictions")
        model = None
    else:
        model = timm.create_model("swin_tiny_patch4_window7_224", pretrained=False, num_classes=2)

        # First attempt: usual torch.load
        try:
            state_dict = torch.load(MODEL_PATH, map_location=device)
            # If state_dict is a dict with 'model' or 'state_dict' keys, try to extract
            if isinstance(state_dict, dict) and ("model" in state_dict or "state_dict" in state_dict):
                # common packaging: {'model': {...}} or {'state_dict': {...}}
                if "model" in state_dict and isinstance(state_dict["model"], dict):
                    sd = state_dict["model"]
                elif "state_dict" in state_dict and isinstance(state_dict["state_dict"], dict):
                    sd = state_dict["state_dict"]
                else:
                    sd = state_dict
                model.load_state_dict(sd)
            else:
                model.load_state_dict(state_dict)
            app.logger.info("[OK] Swin model loaded successfully")
        except Exception as e1:
            app.logger.warning("Standard torch.load failed: %s", e1)
            # Try explicit weights_only=False (PyTorch 2.6+)
            try:
                state_dict = torch.load(MODEL_PATH, map_location=device, weights_only=False)
                # same extraction if packaged
                if isinstance(state_dict, dict) and ("model" in state_dict or "state_dict" in state_dict):
                    if "model" in state_dict and isinstance(state_dict["model"], dict):
                        sd = state_dict["model"]
                    elif "state_dict" in state_dict and isinstance(state_dict["state_dict"], dict):
                        sd = state_dict["state_dict"]
                    else:
                        sd = state_dict
                    model.load_state_dict(sd)
                else:
                    model.load_state_dict(state_dict)
                app.logger.info("[OK] Swin model loaded (weights_only=False)")
            except Exception as e2:
                app.logger.error("Failed to load Swin model: %s | %s", e1, e2)
                model = None
        
        if model is not None:
            model.to(device)
            model.eval()
            app.logger.info("[OK] Swin model ready for inference")
        else:
            app.logger.warning("[WARNING] Swin model failed to load - will use random predictions")

except Exception as e:
    app.logger.exception("Unexpected error creating/loading model: %s", e)
    model = None

# Preprocess for Swin
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# =======================================================
# LOAD DINO-ViT (Heatmaps)
# =======================================================
app.logger.info("Loading DINO-ViT (HuggingFace) for attention heatmaps...")
vit_processor = None
vit_model = None
try:
    vit_processor = ViTImageProcessor.from_pretrained("facebook/dino-vits16")
    vit_model = ViTModel.from_pretrained("facebook/dino-vits16", output_attentions=True)
    vit_model.to(device)
    vit_model.eval()
    app.logger.info("✔ DINO-ViT loaded.")
except Exception as e:
    app.logger.warning("Failed to load HF DINO-ViT: %s", e)
    vit_processor = None
    vit_model = None

# =======================================================
# SAVE BASE64 IMAGE (history -> static folder)
# =======================================================
def save_history_image(b64, username, ts):
    try:
        if not b64:
            return None
        safe_user = (username or "anon").replace(" ", "_")
        folder = os.path.join(STATIC_HISTORY_DIR, safe_user)
        os.makedirs(folder, exist_ok=True)

        fname = f"{ts.replace(':','-').replace('.','_')}_{uuid.uuid4().hex[:8]}.jpg"
        path = os.path.join(folder, fname)

        if "base64," in b64:
            b64 = b64.split("base64,", 1)[1]

        data = base64.b64decode(b64)
        with open(path, "wb") as f:
            f.write(data)

        return f"http://127.0.0.1:5000/static/history_images/{safe_user}/{fname}"
    except Exception as e:
        app.logger.exception("save_history_image failed: %s", e)
        return None

# =======================================================
# HEATMAP BUILDING (from 2D attention map)
# returns dict with base64 original/heatmap/overlay
# =======================================================
def build_heatmaps(attn_2d, pil_img):
    try:
        attn = np.array(attn_2d, dtype=np.float32)
        # normalize
        a_min = attn.min()
        a_max = attn.max()
        if a_max > a_min:
            attn = (attn - a_min) / (a_max - a_min + 1e-12)
        else:
            attn = np.zeros_like(attn)

        # resize attention to (224,224)
        attn_resized = cv2.resize(attn, (224, 224), interpolation=cv2.INTER_LINEAR)
        heatmap = np.uint8(255 * attn_resized)

        # apply slight smoothing
        heatmap = cv2.GaussianBlur(heatmap, (3, 3), 0)

        # colorize
        heat_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        # original image as BGR
        img_np = np.array(pil_img.resize((224, 224)).convert("RGB"))
        img_cv = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

        # overlay
        overlay = cv2.addWeighted(img_cv, 0.7, heat_color, 0.3, 0)

        # helper encode
        def encode_bgr(cv_bgr):
            _, buff = cv2.imencode(".jpg", cv_bgr, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
            return base64.b64encode(buff).decode()

        original_b64 = encode_bgr(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
        heatmap_b64 = encode_bgr(heat_color)
        overlay_b64 = encode_bgr(overlay)

        return {"original": original_b64, "heatmap": heatmap_b64, "overlay": overlay_b64}
    except Exception as e:
        app.logger.exception("build_heatmaps failed: %s", e)
        # fallback to resized original only
        buf = BytesIO()
        pil_img.resize((224,224)).save(buf, format="JPEG")
        b64 = base64.b64encode(buf.getvalue()).decode()
        return {"original": b64, "heatmap": b64, "overlay": b64}

# =======================================================
# AUTH endpoints (signup/login) - simple JSON file DB
# =======================================================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    email = data.get("email", "")
    password = data.get("password")
    admin_code = data.get("adminCode", "")

    if not username or not password:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    users = read_users()
    if any(u.get("username") == username for u in users):
        return jsonify({"success": False, "message": "User exists"}), 400

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    role = "admin" if admin_code == ADMIN_SECRET_CODE else "user"
    users.append({"username": username, "email": email, "password": hashed, "role": role, "joinDate": datetime.now().isoformat()})
    write_users(users)

    history = read_history()
    history.setdefault(username, [])
    history[username].append({"id": str(uuid.uuid4()), "timestamp": datetime.now().isoformat(), "action": "Account Creation", "result": "Success"})
    write_history(history)
    return jsonify({"success": True, "role": role})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"success": False, "message": "Missing credentials"}), 400

    users = read_users()
    user = next((u for u in users if u.get("username") == username), None)
    if not user:
        return jsonify({"success": False, "message": "Invalid username"}), 401
    try:
        if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
            return jsonify({"success": False, "message": "Wrong password"}), 401
    except Exception as e:
        app.logger.exception("Password check error: %s", e)
        return jsonify({"success": False, "message": "Password check error"}), 500

    history = read_history()
    history.setdefault(username, [])
    history[username].append({"id": str(uuid.uuid4()), "timestamp": datetime.now().isoformat(), "action": "Login", "result": "Success"})
    write_history(history)
    return jsonify({"success": True, "role": user.get("role", "user"), "username": username})

# =======================================================
# GET USER HISTORY
# =======================================================
@app.route("/api/user/<username>/history", methods=["GET"])
def get_user_history(username):
    users = read_users()
    user = next((u for u in users if u.get("username") == username), None)
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    history = read_history()
    user_history = history.get(username, [])
    # optionally include base64 image data for local images (already stored: /static/...)
    enriched = []
    for entry in user_history:
        e = dict(entry)
        img_url = e.get("image_url")
        if img_url and img_url.startswith("http://127.0.0.1:5000/static/"):
            try:
                file_path = img_url.replace("http://127.0.0.1:5000/", "")
                full_path = os.path.join(os.getcwd(), file_path)
                if os.path.exists(full_path):
                    with open(full_path, "rb") as f:
                        e["image_base64"] = base64.b64encode(f.read()).decode()
            except Exception:
                pass
        enriched.append(e)
    return jsonify({"success": True, "user": {"username": user["username"], "email": user.get("email",""), "role": user.get("role","user")}, "history": enriched})

# =======================================================
# PREDICT (main) endpoint
# Accepts multipart/form-data with field "image" and optional username
# =======================================================
@app.route("/predict", methods=["POST"])
def predict():
    username = request.form.get("username") or (request.get_json(silent=True) or {}).get("username") or "anonymous"

    if "image" not in request.files:
        return jsonify({"success": False, "message": "No image provided"}), 400

    file = request.files["image"]
    try:
        image = Image.open(file.stream).convert("RGB")
    except Exception:
        return jsonify({"success": False, "message": "Invalid image format"}), 400

    # 1) Swin prediction (if model loaded)
    label = "normal"
    try:
        if model is None:
            label = "normal"
        else:
            input_tensor = preprocess(image).unsqueeze(0).to(device)
            with torch.no_grad():
                out = model(input_tensor)
                pred_idx = int(torch.argmax(out, dim=1).item())
                label = ["defect", "normal"][pred_idx] if pred_idx in (0,1) else "unknown"
    except Exception as e:
        app.logger.exception("Prediction error: %s", e)
        label = "unknown"

    # 2) Heatmap generation (if vit_model available)
    heatmaps = {"original": None, "heatmap": None, "overlay": None}
    try:
        if vit_model is not None and vit_processor is not None:
            # HF processor accepts PIL.Image
            inputs = vit_processor(images=image, return_tensors="pt").to(device)
            with torch.no_grad():
                outputs = vit_model(**inputs)
            if hasattr(outputs, "attentions") and outputs.attentions:
                last_attn = outputs.attentions[-1]  # (batch, heads, tokens, tokens)
                # average heads
                mean_heads = last_attn.mean(dim=1)   # (batch, tokens, tokens)
                # take CLS row (CLS -> patches), exclude cls self-token
                cls_attn = mean_heads[0, 0, 1:]      # (num_patches,)
                n = cls_attn.shape[0]
                side = int(np.sqrt(n))
                if side * side != n:
                    # common DINO ViT uses 14x14 (196). fallback/pad or trim
                    desired = 14
                    if n < desired*desired:
                        pad = desired*desired - n
                        cls_attn = torch.cat([cls_attn, torch.zeros(pad, device=cls_attn.device)])
                        side = desired
                    else:
                        cls_attn = cls_attn[:desired*desired]
                        side = desired
                attn_map_np = cls_attn.reshape(side, side).cpu().numpy()
                heatmaps = build_heatmaps(attn_map_np, image)
            else:
                # fallback: resized original
                buf = BytesIO(); image.resize((224,224)).save(buf, format="JPEG")
                b64 = base64.b64encode(buf.getvalue()).decode()
                heatmaps = {"original": b64, "heatmap": b64, "overlay": b64}
        else:
            # fallback when no vit model loaded
            buf = BytesIO(); image.resize((224,224)).save(buf, format="JPEG")
            b64 = base64.b64encode(buf.getvalue()).decode()
            heatmaps = {"original": b64, "heatmap": b64, "overlay": b64}
    except Exception as e:
        app.logger.exception("Heatmap generation failed: %s", e)
        if heatmaps["original"] is None:
            buf = BytesIO(); image.resize((224,224)).save(buf, format="JPEG")
            b64 = base64.b64encode(buf.getvalue()).decode()
            heatmaps = {"original": b64, "heatmap": b64, "overlay": b64}

    # 3) Save overlay into static and write history
    ts = datetime.now().isoformat()
    overlay_b64 = heatmaps.get("overlay") or heatmaps.get("original")
    saved_url = save_history_image(overlay_b64, username, ts) if overlay_b64 else None

    history = read_history()
    history.setdefault(username, [])
    entry = {
        "id": str(uuid.uuid4()),
        "timestamp": ts,
        "action": "Image Prediction",
        "result": label,
        "image_url": saved_url or (f"data:image/jpeg;base64,{heatmaps.get('original')}"),
        "heatmaps": heatmaps
    }
    history[username].append(entry)
    write_history(history)

    return jsonify({"success": True, "prediction": label, "heatmaps": heatmaps, "history_entry": entry})

# =======================================================
# ADMIN: migrate-history-images (optional)
# =======================================================
@app.route("/admin/migrate-history-images", methods=["POST"])
def migrate_history_images():
    data = request.get_json(silent=True) or {}
    if data.get("secret") != ADMIN_SECRET_CODE:
        return jsonify({"success": False, "message": "Unauthorized"}), 403
    history = read_history()
    saved = 0
    updated = 0
    for username, entries in history.items():
        if not isinstance(entries, list):
            continue
        for e in entries:
            if e.get("image_url"):
                continue
            heatmaps = e.get("heatmaps") or {}
            cand = heatmaps.get("overlay") or heatmaps.get("original") or heatmaps.get("combined")
            if not cand:
                continue
            url = save_history_image(cand, username, e.get("timestamp") or datetime.now().isoformat())
            if url:
                e["image_url"] = url
                saved += 1
                updated += 1
    write_history(history)
    return jsonify({"success": True, "saved": saved, "updated": updated})

# =======================================================
# RUN
# =======================================================
if __name__ == "__main__":
    app.logger.info("Starting backend")
    ensure_directories_exist()
    ensure_model_exists()
    # Production-ready deployment with environment variables
    debug = os.environ.get('FLASK_ENV') == 'development'
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 5000))
    app.run(host=host, port=port, debug=debug)
