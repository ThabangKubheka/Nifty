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
        <h2>Choose your Handyman</h2>
        <h4>With multiple options given to you, you can decide which handyman is best suited to you based on their ratings and location</h4>
        <button className='button'>Continue</button>
      </div>

    </>
  )
}

export default Onboarding