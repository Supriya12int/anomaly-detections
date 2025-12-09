import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Solutions.css";

const Gan = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="solutions-wrapper">
      <div className="container">
        <h1
          data-aos="fade-down"
        >
         Why Use CycleGAN for Anomaly Detection?
        </h1>

        {/* Section 1 */}
        <div className="card" data-aos="fade-up">
          <h2>1. No Need for Paired Data</h2>
         
           In real industrial settings, getting paired images (normal + the same image with an anomaly )is nearly impossible.
           CycleGAN works with unpaired datasets, making it perfect for real-world  scenarios
        </div>

        {/* Section 2 */}
        <div className="card" data-aos="fade-up" data-aos-delay="100">
          <h2>2. Learns Complex Visual Mappings</h2>
          <p>CycleGAN can model subtle and complex transformations between normal and defective appearances.</p>
      <p>This enables the generation of synthetic anomalies or clean reconstructions, highlighting what’s abnormal.</p>
        </div>

        {/* Section 3 */}
        <div className="card" data-aos="fade-up" data-aos-delay="200">
          <h2>3. Highlights Irregularities</h2>
         <p>By translating images from "anomaly" to "normal" (or vice versa), we can easily compare original and generated images.</p>
         <p>The differences between them act as visual markers for defects or irregular patterns.</p>
        </div>

        {/* Section 4 */}
        <div className="card" data-aos="fade-up" data-aos-delay="300">
          <h2>4. Suitable for Visual Inspection Systemss</h2>
           <p>CycleGAN can be integrated into existing visual inspection or camera-based monitoring systems.</p>
           <p>It provides clear visual cues, assisting human operators or downstream AI classifiers.</p>
        </div>

        {/* Section 5 */}
        <div className="card" data-aos="fade-up" data-aos-delay="400">
          <h2>5. Augments Training Data</h2>
          <p>It can generate high-quality synthetic anomalies, enriching the dataset and improving the performance of supervised models.</p>
        </div>

        {/* Section 6 */}
        <div className="card" data-aos="fade-up" data-aos-delay="500">
          <h2>6. Domain Adaptability</h2>
            <p>CycleGAN is known for its ability to learn mappings between domains without explicit labels.</p>
      <p>This is especially useful for adapting to different manufacturing lines, product types, or environments.</p>
        </div>

        {/* Section 7 */}
        <div className="card" data-aos="fade-up" data-aos-delay="600">
          <h2>7. Data Privacy Friendly</h2>
           <p>Since CycleGAN doesn't require paired or labeled defect data, less sensitive or identifiable information is needed.</p>
            <p>This makes it suitable for industries with strict data privacy regulations or limited data-sharing policies.</p>
        </div>
      </div>
    </div>
  );
};

export default Gan;
