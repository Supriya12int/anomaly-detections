import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Research.css"; // Optional: for any custom styles like overlay or card delay

const Research = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="position-relative bg-light py-5">
      <div className="overlay"></div> {/* Optional: For custom dark overlay */}

      <div className="container text-center">
        <h1 id="title" className="mb-5 fw-bold" data-aos="fade-down">
          Research & More on Anomaly Detection
        </h1>

        <div className="row gy-4">
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
            <Link to="/understandingAD" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm p-4 rounded">
                <h2>Understanding Anomaly Detection</h2>
                <p>
                  Exploring the fundamentals of anomaly detection and its significance in industrial settings.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
            <Link to="/gan" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm p-4 rounded">
                <h2>Our Approach with GAN</h2>
                <p>
                  Utilizing CycleGAN to identify and highlight irregularities in image data effectively.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
            <Link to="/application" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm p-4 rounded">
                <h2>Applications</h2>
                <p>
                  Implementing AI-based anomaly detection across various industrial and environmental domains.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
            <Link to="/future" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm p-4 rounded">
                <h2>Future Enhancements</h2>
                <p>
                  Exploring potential improvements and AI advancements in anomaly detection models.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
