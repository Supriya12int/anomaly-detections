import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Solutions.css";
const UnderstandingAD = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="solutions-wrapper">
      <div className="container">
        <h1
          data-aos="fade-down"
        >
          ⚙ Understanding Anomaly Detection
        </h1>

        {/* Section 1 */}
        <div className="card" data-aos="fade-up">
          <h2>1. Overview</h2>
          <p>
            Anomaly detection refers to the identification of patterns in data that deviate significantly from expected behavior...
          </p>
        </div>

        {/* Section 2 */}
        <div className="card" data-aos="fade-up" data-aos-delay="100">
          <h2>2. Types of Anomalies in Industry</h2>
          <ul>
            <li><strong>Point Anomalies:</strong> Single data instances that are abnormal...</li>
            <li><strong>Contextual Anomalies:</strong> Data that is anomalous in a specific context...</li>
            <li><strong>Collective Anomalies:</strong> A group of data points that are anomalous together...</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="card" data-aos="fade-up" data-aos-delay="200">
          <h2>3. Significance in Industrial Applications</h2>
          <ul>
            <li><strong>Predictive Maintenance:</strong> Early identification of equipment failures...</li>
            <li><strong>Quality Control:</strong> Detecting defects in products...</li>
            <li><strong>Operational Efficiency:</strong> Monitoring for process deviations...</li>
            <li><strong>Safety and Compliance:</strong> Detecting abnormal behaviors ensures worker safety...</li>
            <li><strong>Cybersecurity:</strong> Unusual network activity can signal cyberattacks...</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="card" data-aos="fade-up" data-aos-delay="300">
          <h2>4. Common Techniques</h2>
          <ul>
            <li><strong>Statistical Methods:</strong> Control charts, regression models...</li>
            <li><strong>Machine Learning Models:</strong> SVM, K-means, Isolation Forest...</li>
            <li><strong>Deep Learning:</strong> LSTM networks, CNNs, Transformers...</li>
            <li><strong>Hybrid Approaches:</strong> Combine rule-based and AI systems...</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="card" data-aos="fade-up" data-aos-delay="400">
          <h2>5. Data Sources in Industry</h2>
          <ul>
            <li>Sensor and IoT data (temperature, vibration, pressure, etc.)</li>
            <li>Machine logs and control system outputs</li>
            <li>Visual data (e.g., images for inspection)</li>
            <li>Audio data (e.g., machine sound anomalies)</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="card" data-aos="fade-up" data-aos-delay="500">
          <h2>6. Key Challenges</h2>
          <ul>
            <li><strong>Data Imbalance:</strong> Anomalies are rare...</li>
            <li><strong>Concept Drift:</strong> Process changes over time...</li>
            <li><strong>Real-Time Processing:</strong> Need for low-latency systems...</li>
            <li><strong>Interpretability:</strong> Understanding model decisions...</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="card" data-aos="fade-up" data-aos-delay="600">
          <h2>7. Implementation Considerations</h2>
          <ul>
            <li>Start with domain knowledge to define normal/abnormal.</li>
            <li>Use synthetic data (e.g., GANs) if real anomalies are scarce.</li>
            <li>Monitor & retrain models regularly.</li>
            <li>Integrate with control platforms for automated response.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingAD;
