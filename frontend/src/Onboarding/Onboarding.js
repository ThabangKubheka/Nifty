import React from 'react'
import Logo from '../Common/Logo';
import './Onboarding.css';


function Onboarding() {
  return (
    <>
     <div className='nav'>
          <button>Back</button>
          <button>Skip</button>
        </div>
      <Logo/>
      <div className='text'>
        <h2>Welcome</h2>
        <h4>Welcome to Nifty! An app that gives you fast and efficient access to all different types of handymen that you may require!</h4>
        <button className='button'>Continue</button>
      </div>

    </>
  )
}

export default Onboarding