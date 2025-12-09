// src/pages/AvatarSelection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const avatarOptions = [
  {
    id: "admin",
    name: "Admin",
    url: "/images/admin.jpg",
  },
  {
    id: "user",
    name: "User",
    url: "/images/user1.jpg",
  },
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

 const handleConfirm = () => {
  if (selectedAvatar) {
    const avatarData = {
      id: selectedAvatar,
      role: selectedAvatar // "admin" or "user"
    };
    localStorage.setItem("selectedAvatar", JSON.stringify(avatarData));
    if (selectedAvatar === "admin") {
      navigate("/AdminLogin");
    } else {
      navigate("/login");
    }
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Select Your Avatar</h2>
      <div className="d-flex justify-content-center gap-5 mt-4">
        {avatarOptions.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => handleSelect(avatar.id)}
            style={{
              border: selectedAvatar === avatar.id ? "3px solid #007bff" : "2px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
              transition: "0.3s",
              width: "150px",
            }}
          >
            <img
              src={avatar.url}
              alt={avatar.name}
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <div className="mt-2 fw-bold">{avatar.name}</div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary mt-4"
        disabled={!selectedAvatar}
        onClick={handleConfirm}
      >
        Confirm Avatar
      </button>
    </div>
  );
};

export default AvatarSelection;
