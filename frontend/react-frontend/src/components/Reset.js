import React, { useState } from 'react';
import './CSS/Reset.css';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    console.log('Sending reset code to:', email);
  };

  return (
    <div className="reset-container">
      <h1>Reset Password</h1>
      <p>Please enter your email and a new password will be sent to your email.</p>
      <div className="email-wrapper">
        <input
          className="email-container"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <button className="send-code-button" onClick={handleSendCode}>Send Code</button>
    </div>
  );
}

export default ResetPassword;
