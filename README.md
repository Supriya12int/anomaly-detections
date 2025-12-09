# Anomaly Detection Web App

This is an end-to-end anomaly detection system using machine learning and deep learning with Swin Transformer and DINO-ViT heatmaps. The application is built using a Flask backend and React frontend.

## 🛠 Tech Stack
- **Frontend**: React, HTML/CSS, Bootstrap
- **Backend**: Flask (Python)
- **ML Model**: Swin Transformer, DINO-ViT (with attention heatmaps)
- **Auth**: Role-based login (user/admin)
- **Deployment**: Render (backend), Vercel (frontend)

## 🚀 Features
- Upload image for anomaly detection
- View attention heatmap on prediction
- Role-based login system
- Prediction history stored per user
- Admin dashboard to manage users

## 📷 Screenshots
_(Add screenshots of your UI and output here later)_

## 🧪 How to Run Locally

### Backend (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
