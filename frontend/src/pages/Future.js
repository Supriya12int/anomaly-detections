import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Solutions.css";

const Future = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="solutions-wrapper">
      <div className="container">
        <h1
          data-aos="fade-down"
        >
         Future Enhancements
        </h1>

        {/* Section 1 */}
        <div className="card" data-aos="fade-up">
          <h2>1. Integration of Explainable AI (XAI)</h2>
            <p><strong>Why It’s Important:</strong> As anomaly detection models become more complex, understanding the reasoning behind their predictions is essential.</p>
            <p><strong>Impact:</strong> XAI techniques will help engineers and operators understand why anomalies were flagged, providing transparency and ease of model deployment in safety-critical environments.</p>
            <p><strong>Future Development:</strong> Expect advances in interpretable deep learning models, such as explainable CNNs and attention-based models like transformers, for better anomaly interpretation.</p>
        </div>

        {/* Section 2 */}
        <div className="card" data-aos="fade-up">
          <h2>2. Federated Learning and Edge AI for Distributed Anomaly Detection</h2>
          <p><strong>Why It’s Important:</strong> In industrial settings with IoT devices, centralized data collection is impractical due to latency, security, or bandwidth concerns.</p>
           <p><strong>Impact:</strong> Federated learning enables AI models to be trained locally on devices, allowing real-time anomaly detection with privacy preserved.</p>
           <p><strong>Future Development:</strong> Expect more collaborative learning environments with edge devices improving anomaly detection while conserving bandwidth.</p>
        </div>

        {/* Section 3 */}
        <div className="card " data-aos="fade-up">
           <h2>3. Transfer Learning for Multi-Domain Adaptability</h2>
           <p><strong>Why It’s Important:</strong> Anomaly detection models require large amounts of labeled data, which is often scarce in industrial settings.</p>
           <p><strong>Impact:</strong> Transfer learning will allow models trained in one domain to be adapted for another with minimal retraining.</p>
           <p><strong>Future Development:</strong> Transfer learning will make anomaly detection more scalable across diverse industrial environments.</p>
        </div>

        {/* Section 4 */}
        <div className="card" data-aos="fade-up" >
          <h2>4. Self-Training and Semi-Supervised Learning Models</h2>
          <p><strong>Why It’s Important:</strong> Labeled data for training is often limited, especially in complex systems with rare anomalies.</p>
          <p><strong>Impact:</strong> Self-training and semi-supervised learning will help train robust anomaly detection models using both labeled and unlabeled data.</p>
          <p><strong>Future Development:</strong> Innovations will improve model efficiency with limited supervision, speeding up deployment in industrial environments.</p>
        </div>

        {/* Section 5 */}
        <div className="card" data-aos="fade-up">
          <h2>5. Generative Models for Synthetic Data Generation</h2>
          <p><strong>Why It’s Important:</strong> Obtaining rare anomaly instances for training is a major challenge in industries like defect detection.</p>
           <p><strong>Impact:</strong> Generative models such as GANs will help create synthetic anomaly data to enhance model training.</p>
           <p><strong>Future Development:</strong> Expect improvements in generating high-quality synthetic anomalies for better-trained anomaly detection systems.</p>
        </div>

        {/* Section 6 */}
        <div className="card" data-aos="fade-up">
           <h2>6. Real-Time Anomaly Detection with Reinforcement Learning</h2>
      <p><strong>Why It’s Important:</strong> Industrial environments require adaptive, real-time anomaly detection as conditions change rapidly.</p>
      <p><strong>Impact:</strong> Reinforcement learning will enable models to continuously learn from new data, dynamically adjusting detection strategies.</p>
      <p><strong>Future Development:</strong> Expect RL models to autonomously adapt to changes in system behavior for real-time anomaly detection.</p>
        </div>

        {/* Section 7 */}
        <div className="card" data-aos="fade-up">
            <h2>7. AI for Multi-Sensor Fusion and Complex Pattern Recognition</h2>
      <p><strong>Why It’s Important:</strong> Industrial systems often involve multiple sensors. Anomaly detection must integrate data from different sensor types for better accuracy.</p>
      <p><strong>Impact:</strong> Multi-sensor fusion techniques supported by AI models will recognize complex patterns across sensors, improving anomaly detection.</p>
      <p><strong>Future Development:</strong> AI advancements in sensor fusion will create more robust anomaly detection systems for industrial applications.</p>
        </div>

         {/* Section 8 */}
        <div className="card" data-aos="fade-up">
            <h2>8. Anomaly Detection in Time-Series Data Using Transformer Models</h2>
      <p><strong>Why It’s Important:</strong> Time-series data from sensors is abundant in industrial environments, requiring specialized anomaly detection models.</p>
      <p><strong>Impact:</strong> Transformer models will improve the identification of anomalies in time-series data by analyzing long-term dependencies.</p>
      <p><strong>Future Development:</strong> Transformer models will evolve to become more specialized for time-series anomaly detection in industrial contexts.</p>
        </div>

          {/* Section 9 */}
        <div className="card" data-aos="fade-up">
           <h2>9. Automated Anomaly Root-Cause Analysis</h2>
      <p><strong>Why It’s Important:</strong> After detecting anomalies, finding the root cause quickly is critical for timely corrective actions.</p>
      <p><strong>Impact:</strong> AI-driven root-cause analysis will allow systems to identify the cause of anomalies automatically, reducing time-to-response.</p>
      <p><strong>Future Development:</strong> AI will be able to autonomously trace anomalies to specific causes and suggest mitigation actions in real time.</p>
        </div> 

      </div>
    </div>
  );
};

export default Future;
