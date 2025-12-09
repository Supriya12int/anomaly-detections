import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Solutions from "./Solutions";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import "../styles/Home.css"; // CSS file for styles

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <section id="home" className="hero-section d-flex justify-content-center align-items-center text-center">
        <div className="hero-content" data-aos="zoom-in">
          <h2 className="hero-heading">Anomalyze</h2>
          <p className="hero-description">
            Our AI-powered system detects defects in industrial products using deep learning. Trained on real and GAN-generated images, it identifies scratches, cracks, and faults. This ensures accurate quality inspection, minimizes human error, and boosts efficiency.
          </p>
          <Link className=" custom-btn" to="/login">
            Get Started
          </Link>
        </div>
      </section>

      <Solutions />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
