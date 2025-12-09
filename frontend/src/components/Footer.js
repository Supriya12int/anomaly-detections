import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Footer.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section" data-aos="fade-up">
            <h5 className="footer-heading">AnomalyTech Solutions</h5>
            <p>
              Pioneering AI-driven anomaly detection for a safer, more efficient industrial future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section" data-aos="fade-up" data-aos-delay="200">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section" data-aos="fade-up" data-aos-delay="400">
            <h5 className="footer-heading">Contact Us</h5>
            <p>Email: <a href="mailto:info@anomalytech.com">info@anomalytech.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 128 Tech Lane, Innovation City,Chennai</p>
          </div>
        </div>

        <div className="footer-bottom" data-aos="fade-up" data-aos-delay="600">
          <p>© 2025 AnomalyTech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
