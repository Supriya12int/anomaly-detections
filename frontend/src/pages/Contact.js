import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container section-container">
        <h2 className="section-heading text-center mb-4" data-aos="fade-down">
          Contact Us
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form action="#" method="POST" className="contact-form" data-aos="fade-up">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-control" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" rows="4" className="form-control" required></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
