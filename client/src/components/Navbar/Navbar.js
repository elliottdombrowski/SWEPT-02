import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <header className='navbar-header'>
        {/* NAV LEFT */}
        <div className='nav-left'>
          <Link to='/homepage' className='nav-item nav-logo'>
            SWEPT!!!
          </Link>
        </div>

        {/* NAV RIGHT */}
        {/* IMPLEMENT LOGIC TO DISPLAY SWEPT VS SNOW STREETS DEPENDING ON WHAT'S RENDERED */}
        <div className='nav-right'>
          <Link to="/snow" className='nav-item nav-links'>
            SNOW
          </Link>

          {/* IMPLEMENT LOGIC TO DISPLAY IF LOGGED IN */}
          <Link to='/me' className='nav-item nav-links'>
            PROFILE
          </Link>

          <div className='login-btn'>
            <Link to='/login' className='nav-links'>
              SIGN UP
            </Link>
          </div>
        </div>
      </header>
      <div className='deco'>
        <div className='deco-inner'></div>
      </div>
    </div>
  );
};

export default Navbar;