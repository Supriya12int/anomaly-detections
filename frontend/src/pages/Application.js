import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Solutions.css";

const Application = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="solutions-wrapper">
      <div className="container">
        <h1
          data-aos="fade-down"
        >
         Applications
        </h1>

        {/* Section 1 */}
        <div className="card" data-aos="fade-up">
                <h2>1. Predictive Maintenance</h2>
      <p><strong>Objective</strong>: To predict equipment failures before they occur.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic sensor data that simulates normal and faulty conditions allows the model to learn failure patterns and predict breakdowns.</p>
      <p><strong>Benefits</strong>: Reduces downtime, cuts maintenance costs, and optimizes scheduling by detecting potential failures in equipment like motors, pumps, or turbines before they happen.</p>
      <p><strong>Example</strong>: Detecting anomalies in vibration data from machines to predict failures such as bearing wear or misalignments.</p>
        </div>

        {/* Section 2 */}
        <div className="card" data-aos="fade-up" >
          <h2>2. Quality Control and Defect Detection</h2>
      <p><strong>Objective</strong>: To identify defects in products during production.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic images or sensor data of both defective and non-defective products allows for robust training of models, even when real defective data is rare.</p>
      <p><strong>Benefits</strong>: Ensures high-quality products, reduces waste, and speeds up the production process.</p>
      <p><strong>Example</strong>: Detecting surface defects in manufactured goods like car parts, electronics, or pharmaceutical products using synthetic image data generated for anomaly detection.</p>
        </div>

        {/* Section 3 */}
        <div className="card" data-aos="fade-up" >
          <h2>3. Process Optimization</h2>
      <p><strong>Objective</strong>: To improve production efficiency by identifying inefficiencies or deviations in manufacturing processes.</p>
      <p><strong>Use of Synthetic Data</strong>: Simulating various manufacturing conditions and scenarios to detect inefficiencies or process deviations that lead to sub-optimal production performance.</p>
      <p><strong>Benefits</strong>: Increases production efficiency, reduces energy consumption, and improves overall operational performance.</p>
      <p><strong>Example</strong>: Detecting abnormal temperature or pressure variations in industrial processes such as chemical manufacturing or metal forging.</p>
        </div>

        {/* Section 4 */}
        <div className="card" data-aos="fade-up">
          <h2>4. Cybersecurity in Industrial Control Systems</h2>
      <p><strong>Objective</strong>: To detect potential cyber threats or unauthorized activities in industrial control systems (ICS).</p>
      <p><strong>Use of Synthetic Data</strong>: Simulating attack scenarios (like unauthorized access or tampering) and generating synthetic logs of network traffic or system performance data to train anomaly detection models.</p>
      <p><strong>Benefits</strong>: Improves the security of industrial systems, prevents cyber-attacks, and protects sensitive data and infrastructure.</p>
      <p><strong>Example</strong>: Detecting anomalous behavior in SCADA (Supervisory Control and Data Acquisition) systems that monitor critical infrastructure.</p>
        </div>

        {/* Section 5 */}
        <div className="card" data-aos="fade-up" >
           <h2>5. Supply Chain Monitoring</h2>
      <p><strong>Objective</strong>: To monitor the integrity and performance of supply chains.</p>
      <p><strong>Use of Synthetic Data</strong>: Simulating disruptions in supply chains (like delays or stockouts) and generating synthetic data from sensors to detect anomalies in logistics or inventory management.</p>
      <p><strong>Benefits</strong>: Improves supply chain resilience, reduces operational costs, and enhances the overall reliability of logistics operations.</p>
      <p><strong>Example</strong>: Detecting abnormal shipping delays or discrepancies between inventory records and actual stock.</p>
        </div>

        {/* Section 6 */}
        <div className="card" data-aos="fade-up">
          <h2>6. Energy Management and Optimization</h2>
      <p><strong>Objective</strong>: To monitor energy consumption and optimize energy usage across facilities.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic data on energy consumption patterns to train models that can detect inefficiencies or unusual energy usage, even in cases of rare events.</p>
      <p><strong>Benefits</strong>: Optimizes energy consumption, reduces costs, and promotes sustainability by detecting inefficiencies.</p>
      <p><strong>Example</strong>: Detecting unusual spikes in energy usage in a factory’s HVAC system, indicating faulty equipment or inefficient processes.</p>
        </div>

        {/* Section 7 */}
        <div className="card" data-aos="fade-up" >
         <h2>7. Environmental Monitoring</h2>
      <p><strong>Objective</strong>: To monitor environmental conditions and ensure compliance with safety regulations.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic data of environmental sensor readings (such as temperature, humidity, or pollutant levels) under both normal and anomalous conditions to detect hazards or environmental violations.</p>
      <p><strong>Benefits</strong>: Improves safety, ensures compliance with regulations, and detects harmful environmental changes.</p>
      <p><strong>Example</strong>: Detecting abnormal pollutant levels in air quality data from factory exhaust systems.</p>
        </div>

        {/* Section 8 */}
        <div className="card" data-aos="fade-up">
            <h2>8. Autonomous Systems and Robotics</h2>
      <p><strong>Objective</strong>: To ensure the correct functioning of autonomous systems such as drones or robotic arms.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic data for anomalies in sensor inputs (e.g., LiDAR, camera, or accelerometer data) to train models that help robots or drones identify and avoid faults.</p>
      <p><strong>Benefits</strong>: Improves the reliability of autonomous systems and reduces the risk of accidents or failures in autonomous operations.</p>
      <p><strong>Example</strong>: Detecting malfunctioning sensor data or path planning errors in autonomous robotic systems.</p>
    
        </div>

        {/* Section 9 */}
  <div className="card" data-aos="fade-up">
        <h2>9. Visual Inspection for Manufacturing</h2>
      <p><strong>Objective</strong>: To enhance visual inspection processes for defects and irregularities.</p>
      <p><strong>Use of Synthetic Data</strong>: Generating synthetic images of products with various defect types (scratches, cracks, or misalignments) for training machine vision systems to identify defects.</p>
      <p><strong>Benefits</strong>: Reduces human inspection errors, speeds up the inspection process, and ensures product quality.</p>
      <p><strong>Example</strong>: Using synthetic images of PCB boards to train vision systems for identifying soldering defects or missing components.</p>
        </div>

      </div>
    </div>
  );
};

export default Application;
