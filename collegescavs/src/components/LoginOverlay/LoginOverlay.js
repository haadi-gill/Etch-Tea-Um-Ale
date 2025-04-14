import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { newUser as backendSignup, fetchUserByEmail } from '../../bridge';
import { useNavigate } from 'react-router-dom';
import './LoginOverlay.css';

const LoginOverlay = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      if (onClose) onClose();
      navigate('/profile');
    } else {
      setError('Invalid credentials or failed to fetch user info');
    }
  };


  const handleSignup = async () => {
    setError('');

    if (!email.endsWith('@ufl.edu')) {
      setError('Email must be a valid UF address');
      return;
    }

    const existingUser = await fetchUserByEmail(email);
    if (existingUser) {
      setError('An account with this email already exists');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userCreated = await backendSignup(email, password, firstName, lastName, 0);
    if (userCreated) {
      const userInfo = {
        email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        rating: '0',
      };
      const success = await login(email, password);
      if (success) {
        if (onClose) onClose();
        navigate('/profile');
      } else {
        setError("Login failed after account creation.");
      }
    } else {
      setError('Sign up failed, email is invalid');
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (isSignup) {
      await handleSignup();
    } else {
      await handleLogin();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  

  return (
    <div className="login-overlay">
      <div className="login-box">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="login-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="login-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className="login-buttons" onClick={handleSubmit}>
          {isSignup ? 'Create Account' : 'Log In'}
        </button>

        <button className="login-buttons" onClick={handleCancel}>Cancel</button>

        <p className="toggle-mode">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button className="link-button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginOverlay;
