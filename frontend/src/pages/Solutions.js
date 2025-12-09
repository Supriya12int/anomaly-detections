import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import  "../styles/Solsection.css"

const Solutions = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  

  return (
    <>
    <section id="solutions" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" data-aos="fade-down">
          Solutions
        </h2>
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-md-6" data-aos="fade-right">
            <p>
              AnomalyTech Solutions is a leader in AI-driven anomaly detection for industrial
              applications. Our mission is to empower industries with cutting-edge technology to
              identify irregularities before they become critical issues.
            </p>
            <p>
              Using unsupervised and deep learning techniques, our solutions adapt to complex
              industrial environments, providing unparalleled accuracy and efficiency. From
              manufacturing to energy, we ensure your operations run smoothly and safely.
            </p>
            <Link to="/research" className="btn btn-outline-primary mt-3">
              Know more...
            </Link>
          </div>

          {/* Image */}
          <div className="col-md-6 text-center" data-aos="fade-left">
            <img src="/images/ai.jpg" alt="AI Analytics" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </section>
   
    </>

  );
};

export default Solutions;
