import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
  if (role === 'admin') {
    navigate('/admin-login');  // or '/login?role=admin'
  } else {
    navigate('/login');
  }
};

  const cardStyle = {
    width: '220px',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #007bff',
  };

  const textStyle = {
    marginTop: '15px',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#343a40',
  };

  const handleHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
    } else {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Select Your Role to Login</h2>
      <div className="d-flex justify-content-center gap-5 flex-wrap">
        <div
          style={cardStyle}
          onClick={() => handleSelectRole('user')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <img src="/images/user1.jpg" alt="User" style={imageStyle} />
          <p style={textStyle}>User Login</p>
        </div>

        <div
          style={{ ...cardStyle }}
          onClick={() => handleSelectRole('admin')}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          <img src="/images/admin.jpg" alt="Admin" style={imageStyle} />
          <p style={{ ...textStyle, color: '#dc3545' }}>Admin Login</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
