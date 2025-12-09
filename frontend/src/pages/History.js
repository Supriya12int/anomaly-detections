// ...existing code...
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/history.css";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // debug: raw API response
  const [rawResponse, setRawResponse] = useState(null);

  // modal state for large image view
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalInfo, setModalInfo] = useState({ result: "", datetime: "" });
  const [modalHeatmaps, setModalHeatmaps] = useState(null);

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsed = JSON.parse(storedUserInfo);
        if (parsed && parsed.username) {
          setUsername(parsed.username);
          setInputUsername(parsed.username);
          fetchUserHistory(parsed.username);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not parse userInfo from localStorage", e);
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setInputUsername(storedUsername);
      fetchUserHistory(storedUsername);
    }
  }, []);

  const normalizeImageUrl = (raw) => {
    if (raw === null || raw === undefined) return null;

    // handle objects like { data: [...] } or { base64: "..." } or nested image fields
    if (typeof raw === "object") {
      // Uint8/number array -> base64
      if (raw.data && Array.isArray(raw.data)) {
        try {
          const bytes = new Uint8Array(raw.data);
          let binary = "";
          for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
          const b64 = btoa(binary);
          return `data:image/png;base64,${b64}`;
        } catch (e) {
          console.warn("Failed to convert raw.data to base64", e);
        }
      }
      if (raw.base64 && typeof raw.base64 === "string") {
        const s = raw.base64.trim();
        return s.startsWith("data:") ? s : `data:image/png;base64,${s}`;
      }
      // nested image property
      if (raw.image && (typeof raw.image === "string" || typeof raw.image === "object")) {
        return normalizeImageUrl(raw.image);
      }
      return null;
    }

    // string path or base64
    let s = String(raw).trim();
    // remove whitespace/newlines often present in base64 blobs
    s = s.replace(/\s+/g, "");

    // Handle HTTP URLs directly
    if (s.startsWith("http://") || s.startsWith("https://")) {
      console.log("Loading image from URL:", s);
      return s;
    }
    
    if (s.startsWith("data:")) return s;

    // relative path served by backend (prefix with backend origin)
    if (s.startsWith("/")) return `http://127.0.0.1:5000${s}`;

    // common base64 headerless patterns (allow shorter than before)
    const base64Like = /^[A-Za-z0-9+/=]+$/.test(s) && s.length >= 20;
    if (base64Like) return `data:image/png;base64,${s}`;

    // fallback: return as-is (might be a direct URL without protocol)
    return s;
  };

  const getResultText = (item) => {
    const val = item.result || item.prediction || item.label || item.outcome || "";
    return String(val).toUpperCase();
  };

  const formatEntry = (item) => {
    const timestamp = item.timestamp || item.time || item.created_at || item.t || item.ts || new Date().toISOString();
    const datetime = new Date(timestamp).toLocaleString();
    const time = new Date(timestamp).toLocaleTimeString();
    const date = new Date(timestamp).toLocaleDateString();
    const result = getResultText(item) || "UNKNOWN";

    // try many common image field names and nested places
    const rawImage =
      item.image_url ||
      item.image ||
      item.original ||
      item.overlay ||
      item.image_data ||
      item.imageBase64 ||
      item.img ||
      item.picture ||
      // nested candidate
      (item.payload && (item.payload.image || item.payload.image_base64 || item.payload.img)) ||
      (item.data && (item.data.image || item.data.img || item.data.base64));

    const image_url = normalizeImageUrl(rawImage);
    return {
      ...item,
      timestamp,
      datetime,
      time,
      date,
      result,
      image_url,
    };
  };

  const fetchUserHistory = async (username) => {
    setLoading(true);
    setError("");
    setRawResponse(null);
    try {
      const safeName = encodeURIComponent(username);
      setUsername(username);
      const response = await axios.get(`http://127.0.0.1:5000/api/user/${safeName}/history`);
      console.debug("history API response:", response.data);
      setRawResponse(response.data || null);

      const rawHistory = (response.data && Array.isArray(response.data.history)) ? response.data.history : (Array.isArray(response.data) ? response.data : []);
      // be permissive: prefer "Image Prediction" items but fallback to any that have image/result/prediction
      let candidate = rawHistory.filter(item => {
        const action = (item.action || "").toString().toLowerCase();
        const looksLikeImageAction = action.includes("image") || action.includes("prediction");
        const hasImage = item.image_url || item.image || item.original || item.overlay || item.image_data || item.imageBase64 || item.img || (item.payload && (item.payload.image || item.payload.img));
        const hasResult = item.result || item.prediction || item.label || item.outcome;
        return looksLikeImageAction || hasImage || hasResult;
      });

      // if filter removed everything but rawHistory has items, fallback to rawHistory
      if (candidate.length === 0 && rawHistory.length > 0) {
        candidate = rawHistory;
      }

      const formattedHistory = candidate
        .map(formatEntry)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setHistory(formattedHistory);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to load history. Please try again later.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  // badge class helper
  const badgeClassFor = (result) => {
    const r = (result || "").toString().toUpperCase();
    if (!r) return "bg-secondary";
    if (r.includes("DEFECT") || r.includes("ANOMALY") || r.includes("BAD") || r.includes("FAIL")) return "bg-danger";
    if (r.includes("OK") || r.includes("GOOD") || r.includes("NORMAL") || r.includes("SUCCESS") || r.includes("NO_DEFECT")) return "bg-success";
    return "bg-secondary";
  };

  const openModal = (img, info = {}, heatmaps = null) => {
    setModalImage(img);
    setModalInfo(info);
    setModalHeatmaps(heatmaps);
    setModalOpen(true);
  };

  return (
    <div className="history-page">
      {/* Sidebar */}
      <aside className="sidebar-nav">
        <h2>
          <Link to="/model" className="sidebar-title">Dashboard</Link>
        </h2>
        <ul>
          <li><Link to="/feedback"><i className="fa-solid fa-comment "/> Feedback</Link></li>
          <li><Link to="/profile"><i className="fa-solid fa-user" /> Profile</Link></li>
          <li><Link to="/history" className="active"><i className="fa-solid fa-clock-rotate-left" /> History</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content p-4">
        <h2 className="mb-4">Anomaly Detection History</h2>

        {/* username input so page works even without login state */}
        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            style={{ maxWidth: 300 }}
            placeholder="Enter username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (inputUsername && inputUsername.trim()) {
                fetchUserHistory(inputUsername.trim());
              }
            }}
          >
            Load
          </button>
          {username && <h5 className="mb-0 ms-3">User: {username}</h5>}
        </div>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : history.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">No detection history found.</div>

            {/* debug panel shown when no entries rendered */}
            {rawResponse && (
              <div className="mt-3">
                <div className="mb-2">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => {
                      // try to force-use raw history if it exists
                      const rawHistory = Array.isArray(rawResponse.history) ? rawResponse.history : (Array.isArray(rawResponse) ? rawResponse : []);
                      if (rawHistory.length > 0) {
                        const formatted = rawHistory.map(formatEntry).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                        setHistory(formatted);
                        setError("");
                      } else {
                        alert("No history array found in API response.");
                      }
                    }}
                  >
                    Use raw response
                  </button>
                </div>
                <pre style={{ maxHeight: 300, overflow: "auto", background: "#f7f7f7", padding: 12 }}>
                  {JSON.stringify(rawResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="row">
            {history.map((entry, index) => (
              <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card shadow-sm h-100">
                  {entry.image_url ? (
                    <img
                      src={entry.image_url}
                      alt={`Detection ${index + 1}`}
                      className="card-img-top"
                      style={{ objectFit: "cover", height: 220, cursor: "pointer" }}
                      onClick={() => openModal(entry.image_url, { result: entry.result, datetime: entry.datetime })}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 220 }}>
                      <small className="text-muted">No image available</small>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Detection #{history.length - index}</h5>
                    <p className="card-text mb-1"><strong>Detected:</strong> {entry.datetime}</p>
                    <p className="card-text mb-2"><strong>Time:</strong> {entry.time} • <strong>Date:</strong> {entry.date}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className={`badge ${badgeClassFor(entry.result)} p-2`}>
                        {entry.result || "UNKNOWN"}
                      </span>
                      <div>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2" 
                          onClick={() => openModal(entry.image_url, { result: entry.result, datetime: entry.datetime }, entry.heatmaps)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* simple modal for large image preview with heatmaps */}
        {modalOpen && (
          <div className="history-modal-overlay" style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 1050
          }}>
            <div className="history-modal" style={{ background: "#fff", borderRadius: 8, maxWidth: "95%", maxHeight: "95%", overflow: "auto", padding: 20 }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="mb-0">Detection Details</h5>
                  <small className="text-muted">{modalInfo.datetime} • <strong>{modalInfo.result}</strong></small>
                </div>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setModalOpen(false)}>Close</button>
              </div>
              
              {/* Display heatmaps if available */}
              {modalHeatmaps && (modalHeatmaps.original || modalHeatmaps.heatmap || modalHeatmaps.overlay) ? (
                <div className="row">
                  {modalHeatmaps.original && (
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 10 }}>
                        <h6 className="text-center mb-2">Original Image</h6>
                        <img 
                          src={`data:image/jpeg;base64,${modalHeatmaps.original}`} 
                          alt="Original" 
                          style={{ width: "100%", borderRadius: 4 }} 
                        />
                      </div>
                    </div>
                  )}
                  {modalHeatmaps.heatmap && (
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 10 }}>
                        <h6 className="text-center mb-2">Attention Heatmap</h6>
                        <img 
                          src={`data:image/jpeg;base64,${modalHeatmaps.heatmap}`} 
                          alt="Heatmap" 
                          style={{ width: "100%", borderRadius: 4 }} 
                        />
                      </div>
                    </div>
                  )}
                  {modalHeatmaps.overlay && (
                    <div className="col-md-6 col-lg-4 mb-3">
                      <div style={{ border: "1px solid #ddd", borderRadius: 6, padding: 10 }}>
                        <h6 className="text-center mb-2">Defect Localization</h6>
                        <img 
                          src={`data:image/jpeg;base64,${modalHeatmaps.overlay}`} 
                          alt="Overlay" 
                          style={{ width: "100%", borderRadius: 4 }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  {modalImage ? (
                    <img src={modalImage} alt="Preview" style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 6 }} />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 300 }}>
                      <small className="text-muted">No image available</small>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
// ...existing code...