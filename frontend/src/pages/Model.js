import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Model.css";
import axios from "axios";

const Model = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [heatmaps, setHeatmaps] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
    setError("");
    setHeatmaps(null);
  };

  const handleDetect = async () => {
  if (!file) {
    setError("Please upload an image first.");
    return;
  }

  setLoading(true);
  setResult("");
  setError("");
  setHeatmaps(null);  // Clear previous heatmaps
  setPreview(URL.createObjectURL(file)); // Ensure preview is updated

  const formData = new FormData();
  formData.append("image", file);
  const username = localStorage.getItem("username");
  if (username) {
    formData.append("username", username);
  }

  try {
    const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.prediction) {
      const prediction = res.data.prediction.toUpperCase();
      setResult(`Prediction: ${prediction}`);
      
      if (res.data.heatmaps) {
        setHeatmaps({
          original: `data:image/jpeg;base64,${res.data.heatmaps.original}`,
          heatmap: `data:image/jpeg;base64,${res.data.heatmaps.heatmap}`,
          overlay: `data:image/jpeg;base64,${res.data.heatmaps.overlay}`,
          combined: res.data.heatmaps.combined
        });
      }
    } else {
      setError("Prediction failed.");
    }
  } catch (err) {
    setError("Error occurred while sending request.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="profile-page">
      {/* Sidebar */}
      <aside className="sidebar-nav">
        <h2>
          <Link to="/model" className="sidebar-title">Dashboard</Link>
        </h2>
        <ul>
          <li><Link to="/feedback"><i className="fa-solid fa-comment " /> Feedback</Link></li>
          <li><Link to="/profile" className='active'><i className="fa-solid fa-user" /> Profile</Link></li>
          <li><Link to="/history"><i className="fa-solid fa-clock-rotate-left" /> History</Link></li>
          <li><Link to="/help"><i className="fa-solid fa-circle-question" /> Help</Link></li>
        </ul>
      </aside>

      <div className="main-content">
        <main className="p-4">
          <section className="bg-white p-4 rounded shadow mb-4">
            <h3 className="h4 text-primary mb-2">Upload Image for Detection</h3>
            <p className="text-muted mb-3">Choose an image file for anomaly detection.</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-3 form-control"
            />

            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: "300px" }} />
              </div>
            )}

            <button
              onClick={handleDetect}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Detecting...
                </>
              ) : "Start Detection"}
            </button>

            {result && (
              <div className="mt-3 p-3 alert alert-success">
                {result}
              </div>
            )}
            {error && (
              <div className="mt-3 p-3 alert alert-danger">
                {error}
              </div>
            )}

            {/* Heatmap Visualization Section */}
          
            {heatmaps && (
              <div className="mt-4">
                <h4 className="mb-3">Defect Analysis Visualization</h4>

                {/* Combined visualization - make this full width */}
                

                {/* Individual visualizations - make these larger */}
                <div className="row">
                  <div className="col-md-4 mb-4"> {/* Changed from col-md-3 to col-md-4 for fewer columns */}
                    <div className="card h-100">
                      <div className="card-header bg-info text-white">
                        Original Image
                      </div>
                      <div className="card-body p-0 d-flex justify-content-center align-items-center"
                        style={{ minHeight: '300px' }}> {/* Fixed height container */}
                        <img
                          src={heatmaps.original}
                          alt="Original"
                          style={{ maxHeight: '280px', width: 'auto' }} /* Larger fixed size */
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-danger text-white">
                        Heatmap
                      </div>
                      <div className="card-body p-0 d-flex justify-content-center align-items-center"
                        style={{ minHeight: '300px' }}>
                        <img
                          src={heatmaps.heatmap}
                          alt="Heatmap"
                          style={{ maxHeight: '280px', width: 'auto' }}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-success text-white">
                        Defect Localization
                      </div>
                      <div className="card-body p-0 d-flex justify-content-center align-items-center"
                        style={{ minHeight: '300px' }}>
                        <img
                          src={heatmaps.overlay}
                          alt="Overlay"
                          style={{ maxHeight: '280px', width: 'auto' }}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Model;