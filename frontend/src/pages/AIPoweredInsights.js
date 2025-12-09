import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Aabout.css";

const AIPoweredInsights = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="ai-section">
      <div className="container">
        <h3 data-aos="fade-up">🧠 AI-Powered Insights</h3>
        <p data-aos="fade-up" data-aos-delay="100">
          <strong>
            Leveraging CycleGAN for synthetic data generation and transformer-based detection.
          </strong>
        </p>

        <h4 data-aos="fade-up" data-aos-delay="200">🔁 1. CycleGAN for Synthetic Data Generation</h4>
        <p data-aos="fade-up" data-aos-delay="300">
          <strong>What it is:</strong> CycleGAN is a type of GAN for unpaired image-to-image translation.
        </p>
        <p data-aos="fade-up" data-aos-delay="400">
          <strong>Use case in industry:</strong>
        </p>
        <ul data-aos="fade-up" data-aos-delay="500">
          <li>Generate synthetic anomalies from normal data.</li>
          <li>Augment datasets where defect data is rare.</li>
          <li>Boost detection model robustness.</li>
        </ul>

        <p data-aos="fade-up" data-aos-delay="600">
          <strong>Why it matters:</strong>
        </p>
        <ul data-aos="fade-up" data-aos-delay="700">
          <li>Reduces dependence on large labeled datasets.</li>
          <li>Enables controlled, diverse anomaly training.</li>
        </ul>

        <p data-aos="fade-up" data-aos-delay="800">
          <strong>How:</strong> Start with normal images. CycleGAN learns transformations to anomalous versions.
        </p>
        <p data-aos="fade-up" data-aos-delay="900">
          <strong>Why:</strong> Real defects are rare. CycleGAN creates diverse, realistic ones.
        </p>

        <h4 data-aos="fade-up" data-aos-delay="1000">🧠 2. Transformer-Based Detection</h4>
        <p data-aos="fade-up" data-aos-delay="1100">
          <strong>What it is:</strong> Transformers like ViT and DETR use self-attention for pattern detection.
        </p>
        <p data-aos="fade-up" data-aos-delay="1200">
          <strong>Use case:</strong>
        </p>
        <ul data-aos="fade-up" data-aos-delay="1300">
          <li>Detect subtle, contextual anomalies.</li>
          <li>Process spatial/temporal patterns effectively.</li>
          <li>Ideal for visual inspections.</li>
        </ul>

        <p data-aos="fade-up" data-aos-delay="1400">
          <strong>Why it matters:</strong>
        </p>
        <ul data-aos="fade-up" data-aos-delay="1500">
          <li>Detect complex patterns with minimal engineering.</li>
          <li>Great for real-time predictive maintenance.</li>
        </ul>

        <p data-aos="fade-up" data-aos-delay="1600">
          <strong>How:</strong> Vision Transformers learn full-image context with self-attention.
        </p>
        <p data-aos="fade-up" data-aos-delay="1700">
          <strong>Why:</strong> Better context understanding than CNNs.
        </p>

        <h4 data-aos="fade-up" data-aos-delay="1800">🚀 Why Use This Combination</h4>
        <div className="table-container" data-aos="fade-up" data-aos-delay="1900">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>CycleGAN</th>
                <th>Transformers</th>
                <th>Combined Power</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data Scarcity</td>
                <td>Solves it with synthetic examples</td>
                <td>Learns from diverse patterns</td>
                <td>Works even with limited real defect data</td>
              </tr>
              <tr>
                <td>Flexibility</td>
                <td>Generates many defect types</td>
                <td>Adapts to new patterns fast</td>
                <td>Easily scaled to new setups</td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>Creates realistic defects</td>
                <td>Detects complex signals</td>
                <td>High-performance anomaly detection</td>
              </tr>
              <tr>
                <td>Real-Time Use</td>
                <td>Pre-generates data</td>
                <td>Fast inference</td>
                <td>Real-time QA on the line</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 data-aos="fade-up" data-aos-delay="2000">💡 In Summary:</h4>
        <p data-aos="fade-up" data-aos-delay="2100">
          <em>You use <strong>CycleGAN</strong> to create the data you <u>wish</u> you had, and <strong>transformers</strong> to <u>understand</u> that data deeply.</em>
        </p>
        <p data-aos="fade-up" data-aos-delay="2200">
          <em>Together, they create scalable, intelligent industrial AI systems.</em>
        </p>
      </div>
    </section>
  );
};

export default AIPoweredInsights;
