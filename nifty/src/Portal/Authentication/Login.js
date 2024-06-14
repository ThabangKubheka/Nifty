import React, { useState } from 'react';
import './Auth.css';
import { login } from '../../Services/Services';


const LoginPortal = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn =async (username, password) => {
    await login(username, password);
    alert('Hi')
  };

  return (

    <div className='main'>

      <div className="auth-container">

        <h1>Login</h1>

        <form onSubmit={signIn}>

          <div className="form-group">

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
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

          <div className="auth-button-container">

            <button type="submit" className="auth-button" onClick={signIn}>
              Login
            </button>

          </div>

        </form>
      </div>

    </div>
  );
};

export default LoginPortal;