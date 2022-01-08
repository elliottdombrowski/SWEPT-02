import React, { useState, useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <header className='navbar-header'>
        {/* NAV LEFT */}
        <div className='nav-left'>
          <a 
            href="#"
            rel="noopener noreferrer"
            className='nav-item nav-logo'
          >
            SWEPT!!!
          </a>
        </div>

        {/* NAV RIGHT */}

        {/* IMPLEMENT LOGIC TO DISPLAY SWEPT VS SNOW STREETS DEPENDING ON WHAT'S RENDERED */}
        <div className='nav-right'>
          <a
            href="#"
            rel="noopener noreferrer"
            className='nav-item nav-links'
          >
            SNOW
          </a>

          {/* IMPLEMENT LOGIC TO DISPLAY IF LOGGED IN */}
          <a
            href="#"
            rel="noopener noreferrer"
            className='nav-item nav-links'
          >
            PROFILE
          </a>

          <div className='login-btn'>
            <a
              href="#"
              rel="noopener noreferrer"
              className='nav-item nav-links'
            >
              SIGN UP
            </a>
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