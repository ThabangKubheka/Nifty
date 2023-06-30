import React from 'react'
import logo from '../Logos/hammer.svg';
import './Logo.css';

function Logo() {
  return (
    <div className='logo-container'>
      <img src={logo} className="logo-img" alt="logo" />
    </div>
  )
}

export default Logo