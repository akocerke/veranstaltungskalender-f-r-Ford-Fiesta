import React from 'react';
import logo from '../images/logo.png';

const HeroSection = () => (
  
    <div className='Header text-center'>
      <h1 className='mt-3 headline'>Ford Fiesta Treffen & Events</h1>
      <img src={logo} alt="Logo" height='100' />
      <hr className='hr1 shadow-lg'/>
    </div>
);

export default HeroSection;