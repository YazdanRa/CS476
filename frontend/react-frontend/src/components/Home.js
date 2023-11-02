import React from 'react';
import './CSS/Home.css';

function HomeForm() {
  return (
    <div className="login-container">
      <h1 className="website-title">WebsiteTitle</h1>
      <input type="email" placeholder="Email" className="input-field"/>
      <input type="password" placeholder="Password" className="input-field"/>
      <a href="./Reset" className="forgot-password">Forgot your password?</a>
      <button className="login-button">Login</button>
      <button className="signup-button">Sign Up</button>
    </div>
  );
}

export default HomeForm;