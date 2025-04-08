import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { Link, useNavigate } from 'react-router-dom';
import './LoginOverlay.css'

/*
Login overlay that can be displayed on any page.
Acts as a popup to prompt the user to log in.
Right now, only appears if a user is not logged in
and attempts to access profile page.
*/

const LoginOverlay = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      onClose();
      navigate('/profile');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          className = "login-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className = "login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className= "login-buttons" onClick={handleLogin}>Log In</button>
        <button className= "login-buttons" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default LoginOverlay;
