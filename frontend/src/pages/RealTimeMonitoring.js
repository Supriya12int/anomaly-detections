import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Aabout.css";
const RealTimeMonitoring = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-5bg-light">
      <div className="container">
        <h2 className="fw-bold text-center mb-4" data-aos="fade-down">
          ⚡ Real-Time Monitoring
        </h2>

        <p data-aos="fade-up">
          <strong>What it is:</strong> Real-time monitoring involves continuously observing data streams and instantly detecting anomalies or issues as they happen, without delay. It's essential for fast decision-making and safety-critical environments.
        </p>

        <p data-aos="fade-up">
          <strong>How it's done:</strong>
        </p>
        <ul data-aos="fade-up">
          <li><strong>Edge Computing:</strong> Data is processed locally at the source (e.g., on sensors or embedded devices), enabling ultra-low-latency detection without needing to send data to a central server.</li>
          <li><strong>Cloud Computing:</strong> Offers scalable resources for analyzing and storing large volumes of data. Often used for long-term trend analysis, retraining AI models, and integrating insights across systems.</li>
          <li><strong>Hybrid Approach:</strong> Many modern systems combine both edge and cloud for the best of speed and scalability—edge handles instant detection, while cloud handles advanced learning and insights.</li>
        </ul>

        <p data-aos="fade-up"><strong>Why it's used:</strong></p>
        <ul data-aos="fade-up">
          <li>To identify and respond to defects, failures, or safety hazards as soon as they appear.</li>
          <li>To reduce production delays, quality issues, or system breakdowns by catching problems early.</li>
          <li>To feed real-time data into dashboards, alerts, or automatic control systems that improve efficiency.</li>
        </ul>

        <p data-aos="fade-up"><strong>Purpose in Industry:</strong></p>
        <ul data-aos="fade-up">
          <li><strong>Quality Control:</strong> Automatically flag defective products on assembly lines in real time.</li>
          <li><strong>Predictive Maintenance:</strong> Detect subtle changes in machine behavior to prevent unexpected breakdowns.</li>
          <li><strong>Worker Safety:</strong> Monitor critical thresholds (like temperature, pressure, or movement) to trigger safety responses.</li>
          <li><strong>Operational Optimization:</strong> Make real-time adjustments to optimize production flow or reduce waste.</li>
        </ul>

        <p data-aos="fade-up">
          <strong>Why it matters:</strong> Real-time monitoring powered by AI and computing at the edge/cloud is key to modern smart factories. It ensures faster reactions, fewer defects, safer environments, and more reliable operations.
        </p>

        <p data-aos="fade-up"><strong>🏭 Use cases in industry:</strong></p>
        <ul data-aos="fade-up">
          <li>Visual quality inspection on manufacturing lines (detecting surface defects, alignment issues, etc.)</li>
          <li>Monitoring sensor data for predictive maintenance (detecting overheating, vibration anomalies, etc.)</li>
          <li>Safety systems (instantly identifying hazardous conditions)</li>
          <li>Smart logistics (monitoring conveyor belts, packaging processes, etc.)</li>
        </ul>

        <p data-aos="fade-up"><strong>🚀 Why it matters (continued):</strong></p>
        <ul data-aos="fade-up">
          <li>Minimizes downtime: Fast anomaly detection allows for instant alerts and quick resolution.</li>
          <li>Saves costs: Prevents production defects from piling up, reducing waste and rework.</li>
          <li>Improves safety: Immediate reaction to dangerous faults or failures.</li>
          <li>Boosts efficiency: Real-time data enables better decision-making and process optimization.</li>
        </ul>

        <p data-aos="fade-up"><strong>🧠 AI’s role in real-time monitoring:</strong></p>
        <ul data-aos="fade-up">
          <li>Detects subtle patterns human inspectors may miss.</li>
          <li>Learns from data over time to reduce false positives.</li>
          <li>Enables automatic feedback loops for smart process control.</li>
        </ul>
      </div>
    </section>
  );
};

export default RealTimeMonitoring;
