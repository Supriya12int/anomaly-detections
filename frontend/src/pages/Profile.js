import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [profileImage, setProfileImage] = useState('https://api.dicebear.com/7.x/adventurer/svg?seed=Ada');
  const [showDropdown, setShowDropdown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({});

  const togglePassword = (id) => {
    setPasswordVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGalleryUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const imageOptions = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Ada',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Milo'
  ];
   
  return (
      <div className="profile-page">
        {/* Sidebar */}
        <aside className="sidebar-nav">
          <h2>
            <Link to="/model" className="sidebar-title">Dashboard</Link>
          </h2>
          <ul>
           <li><Link to="/feedback"><i className="fa-solid fa-comment "/> Feedback</Link></li>
            <li><Link to="/profile" className='active'><i className="fa-solid fa-user" /> Profile</Link></li>
            <li><Link to="/history"><i className="fa-solid fa-clock-rotate-left" /> History</Link></li>
          </ul>
        </aside>
  
  

      {/* Main Content */}
      <div className="main-content container py-4" style={{ marginLeft: '250px' }}>
        <div className="row">
          {/* Left Column: Image and Password */}
          <div className="col-md-4">
            <h5 className="mb-4">Account Management</h5>
            <div className="text-center mb-4">
              <img src={profileImage} alt="Profile" className="rounded-circle mb-3" width="120" height="120" />
              <div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowDropdown(!showDropdown)}>Upload Photo</button>
              </div>
              {showDropdown && (
                <div className="mt-2 text-start">
                  <input type="file" className="form-control form-control-sm mb-2" onChange={handleGalleryUpload} />
                  <div className="d-flex gap-2">
                    {imageOptions.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setProfileImage(img)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {['Old Password', 'New Password', 'Confirm Password'].map((label, i) => {
              const id = label.toLowerCase().replace(/\s/g, '');
              return (
                <div className="mb-3 position-relative" key={i}>
                  <label className="form-label">{label}</label>
                  <input
                    type={passwordVisible[id] ? 'text' : 'password'}
                    className="form-control"
                    placeholder={label}
                  />
                  <i
                    className="fas fa-eye position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: 'pointer' }}
                    onClick={() => togglePassword(id)}
                  ></i>
                  <div className="text-danger small">Enter your {label.toLowerCase()}</div>
                </div>
              );
            })}

            <button className="btn btn-primary w-100 mb-2">Change Password</button>
            <button className="btn btn-outline-secondary w-100">Forgot Password?</button>
          </div>

          {/* Right Column: Profile Info */}
          <div className="col-md-8">
            <h5 className="mb-4">Profile Information</h5>
            <form>
              <div className="row">
                {[
                  { label: 'First Name', name: 'firstName', type: 'text' },
                  { label: 'Last Name', name: 'lastName', type: 'text' },
                  { label: 'Username', name: 'username', type: 'text' },
                  { label: 'Email Address', name: 'email', type: 'email' },
                  { label: 'Phone Number', name: 'phone', type: 'tel' }
                ].map((field, i) => (
                  <div className="col-md-6 mb-3" key={i}>
                    <label className="form-label">{field.label}</label>
                    <input className="form-control" type={field.type} name={field.name} required />
                    <div className="text-danger small">{field.label} is required</div>
                  </div>
                ))}

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label>
                  <select className="form-select" name="gender">
                    <option value="">Select Gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
