import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "../styles/About.css"; // Add this line for custom styling

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="about-heading" data-aos="fade-down">
          About
        </h2>
        <div className="row gy-4">
          {/* Card 1 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <Link to="/real-time-monitoring" className="about-link">
              <div className="about-card">
                <h3>Real-Time Monitoring</h3>
                <p>
                  Our systems analyze sensor data in real-time, detecting anomalies with minimal latency to prevent downtime and enhance safety.
                </p>
              </div>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <Link to="/predictive-maintenance" className="about-link">
              <div className="about-card">
                <h3>Predictive Maintenance</h3>
                <p>
                  Leverage AI to predict equipment failures before they occur, optimizing maintenance schedules and reducing costs.
                </p>
              </div>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <Link to="/ai-powered-insights" className="about-link">
              <div className="about-card">
                <h3>AI-Powered Insights</h3>
                <p>
                  Tailored machine learning models designed for your specific industrial needs, ensuring maximum accuracy and adaptability.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
