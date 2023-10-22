import React, { useState } from 'react';
import './Reset.css';

function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // Handle the send code logic here
    console.log('Sending reset code to:', email);
  };

  return (
    <div className="reset-container">
      <h1>Reset Password</h1>
      <p>Please enter your email and a new password will be sent to your email.</p>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={handleSendCode}>Send Code</button>
    </div>
  );
}

export default ResetPassword;
