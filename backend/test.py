import torch
import timm

print("Creating model...")
model = timm.create_model('swin_tiny_patch4_window7_224', pretrained=False, num_classes=2)

try:
    print("Loading model weights...")
    model.load_state_dict(torch.load("swin_transformer_trained.pth", map_location="cpu"))
    print("✅ Model loaded successfully!")
except Exception as e:
    print("❌ Failed to load model:")
    print(e)
