import React, { useState } from 'react';
import './Auth.css';

const Register = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (

    <div className='main'>

      <div className="auth-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
            />

          </div>

          <div className="auth-button-container">

            <button type="submit" className="auth-button">
              Sign Up
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;