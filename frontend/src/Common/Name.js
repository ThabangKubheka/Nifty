import React from 'react'
import name from '../Logos/main-logo.svg';
import './Logo.css';

function Name() {
  return (
    <div className='logo-container'>
      <img src={name} className="logo-img" alt="logo" />
    </div>
  )
}

export default Name