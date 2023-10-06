import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  // Define state variables to store user input (e.g., email and password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic (e.g., sending data to a server)
    console.log('Signup data:', { email, password });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="signup-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}

export default Signup;