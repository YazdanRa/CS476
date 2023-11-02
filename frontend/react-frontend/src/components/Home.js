import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Home.css';

function HomeForm() {
  return (
    <div className="login-container">
      <h1 className="website-title">WebsiteTitle</h1>
      
      <input type="email" placeholder="Email" className="input-field"/>
      <input type="password" placeholder="Password" className="input-field"/>

      <a href="./Reset" className="forgot-password">Forgot your password?</a>

      <Link to = "/dashboard">
        <button className="login-button">Login</button>
      </Link>

      <Link to = "/signup">
        <button className="signup-button">Sign Up</button>
      </Link>

    </div>
  );
}

export default HomeForm;