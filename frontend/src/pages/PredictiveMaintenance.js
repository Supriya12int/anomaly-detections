import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Aabout.css';

const PredictiveMaintenance = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="predictive-container">
      <div className="container">
      <h1 data-aos="fade-down">🔧 Predictive Maintenance</h1>
      <p className="intro" data-aos="fade-up">
        Predictive Maintenance helps us detect machine problems before they happen. By using real-time sensor data and AI, we can fix issues early, reduce downtime, and extend equipment life.
      </p>

      <h2 data-aos="fade-right">🧠 How it Works</h2>
      <ul data-aos="fade-up">
        <li><strong>Sensors collect data:</strong> Vibration, temperature, noise, and other readings are constantly monitored.</li>
        <li><strong>AI analyzes the data:</strong> Detects unusual patterns like overheating or irregular vibrations.</li>
        <li><strong>System alerts:</strong> Sends early warnings before failures occur, allowing for proactive action.</li>
      </ul>

      <h2 data-aos="fade-right">✅ Why It’s Useful</h2>
      <ul data-aos="fade-up">
        <li>Avoids unexpected breakdowns</li>
        <li>Saves money by preventing unnecessary repairs</li>
        <li>Improves safety and reliability</li>
        <li>Extends machine lifespan</li>
      </ul>

      <h2 data-aos="fade-right">🏭 Real-Life Example</h2>
      <p data-aos="fade-up">
        <strong>Machine:</strong> Bottle capping motor<br />
        <strong>Issue:</strong> Increasing vibration and temperature<br />
        <strong>AI Response:</strong> "This motor might fail soon. Check alignment or lubrication."<br />
        <strong>Action:</strong> Maintenance team resolves it before failure, preventing downtime.
      </p>

      <h2 data-aos="fade-right">🔧 How Are We Going to Use Predictive Maintenance?</h2>
      <p data-aos="fade-up">
        In our AI-powered anomaly detection system, predictive maintenance plays a key role in keeping machines running smoothly and preventing costly failures.
      </p>

      <h2 data-aos="fade-right">⚙ Our Approach</h2>
      <ul data-aos="fade-up">
        <li><strong>Sensor Integration with IoT Devices:</strong><br />We connect sensors (for vibration, temperature, etc.) to factory machines. These sensors constantly send real-time data to our system.</li>
        <li><strong>AI Model Monitoring:</strong><br />Our AI system analyzes the incoming sensor data using advanced models. It looks for unusual patterns (like overheating or irregular movements).</li>
        <li><strong>Early Warnings & Alerts:</strong><br />If something abnormal is detected, the system sends instant alerts. Maintenance teams get notified before a serious problem occurs.</li>
        <li><strong>Dashboard & Reports:</strong><br />We provide a live dashboard showing machine health status. Historical data helps in planning future maintenance or replacements.</li>
      </ul>

      <h2 data-aos="fade-right">📦 Example in Use</h2>
      <p data-aos="fade-up">
        <strong>Machine:</strong> Bottle capping motor on a production line<br />
        <strong>Sensor data:</strong> Slight increase in vibration & temperature<br />
        <strong>AI Response:</strong> “This motor might fail in the next few days. Check alignment or lubrication.”<br />
        <strong>Action:</strong> Technician performs maintenance, avoiding breakdown and downtime.
      </p>

      <p className="goal" data-aos="zoom-in">
        🎯 <strong>Goal:</strong> Increase uptime, reduce costs, and keep operations running smoothly with smart, AI-powered maintenance.
      </p>
      </div>
    </section>
  );
};

export default PredictiveMaintenance;
