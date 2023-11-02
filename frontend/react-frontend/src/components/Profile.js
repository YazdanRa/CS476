import React, { useState } from 'react';
import './CSS/Profile.css';

function Profile() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    dateOfBirth: '',
    profileImage: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({ ...prevData, profileImage: file }));
  };

  const handleSubmit = () => {
    // Handle the sign up logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <div className="image-upload">
        <label htmlFor="profileImage">
          <div className="placeholder-image"></div>
        </label>
        <input 
          type="file" 
          id="profileImage" 
          name="profileImage" 
          onChange={handleImageChange}
          hidden 
        />
        <span>Upload Picture</span>
      </div>
      <input 
        type="text" 
        placeholder="Full Name" 
        name="fullName" 
        value={formData.fullName} 
        onChange={handleChange}
      />
      <input 
        type="text" 
        placeholder="Username" 
        name="username" 
        value={formData.username} 
        onChange={handleChange}
      />
      <input 
        type="password" 
        placeholder="Password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange}
      />
      <input 
        type="email" 
        placeholder="Email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange}
      />
      <input 
        type="date" 
        placeholder="Date of Birth" 
        name="dateOfBirth" 
        value={formData.dateOfBirth} 
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
}

export default Profile;
