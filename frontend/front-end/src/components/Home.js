import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <nav className="navigation-container">
        <ul className="navigation-list">
          <li className="navigation-item">
            <Link to="/" className="navigation-link">Home</Link>
          </li>
          <li className="navigation-item">
            <Link to="/dashboard" className="navigation-link">Dashboard</Link>
          </li>
          <li className="navigation-item">
            <Link to="/login" className="navigation-link">Login</Link>
          </li>
          <li className="navigation-item">
            <Link to="/signup" className="navigation-link">Signup</Link>
          </li>
        </ul>
      </nav>
      <div className="home-content">
        <h1>Welcome to Our Website</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;