import React, { useState } from 'react';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login started');

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordPattern.test(password)) {
      setLoginError('Invalid password');
      console.log(passwordPattern.test(password))
      return false;
    }
  
    const requestBody = {
      email: email,
      password: password
    };
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.log('An error occurred during login:', error);
      });

      return true;
  };
  

  return (
    <div className='main'>
    <div className="login-container">
      <h1>Login</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className="re-form-group">
          <label className='email'>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="re-form-group">
          <label className='password'>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <label>{loginError}</label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
