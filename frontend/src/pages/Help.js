// src/pages/Help.js
import React from "react";
import "../styles/Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <h1>🛠 Help & Support - Anomaly Detection System</h1>

      <section>
        <h2>Overview</h2>
        <p>
          This help page is designed to assist users in understanding,
          troubleshooting, and maximizing the efficiency of our industrial
          Anomaly Detection System using synthetic data and AI models.
        </p>
      </section>

      <section>
        <h2>Common Issues</h2>
        <ul>
          <li>
            <strong>Model not detecting anomalies correctly:</strong> Ensure
            proper calibration and retraining with new data.
          </li>
          <li>
            <strong>Slow performance:</strong> Check system resource usage or
            reduce image resolution.
          </li>
          <li>
            <strong>Data not uploading:</strong> Ensure file format
            compatibility (.jpg, .png, .csv).
          </li>
          <li>
            <strong>Dashboard not responding:</strong> Clear browser cache or
            check backend service.
          </li>
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>
            <strong>Q:</strong> Can I use my own data?
            <br />
            <strong>A:</strong> Yes! The system supports custom image or sensor
            data input.
          </li>
          <li>
            <strong>Q:</strong> Does it work in real-time?
            <br />
            <strong>A:</strong> Absolutely. It supports real-time detection via
            camera or live feeds.
          </li>
          <li>
            <strong>Q:</strong> How do I interpret anomaly results?
            <br />
            <strong>A:</strong> The system highlights anomaly scores and visual
            differences from normal baselines.
          </li>
          <li>
            <strong>Q:</strong> Is my data secure?
            <br />
            <strong>A:</strong> Yes, we ensure encryption and GDPR-compliant
            storage practices.
          </li>
        </ul>
      </section>

      <section className="contact-box">
        <h2>Contact Support</h2>
        <p>
          If your issue is not listed or unresolved, please contact our
          technical team:
        </p>
        <p>
          <strong>Email:</strong> support@anomalydetect.ai
        </p>
        <p>
          <strong>Phone:</strong> +1 (800) 123-4567
        </p>
        <p>
          <strong>Available:</strong> Mon–Fri, 9:00 AM – 6:00 PM (UTC)
        </p>
      </section>
    </div>
  );
};

export default Help;
