import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to='/homepage'>
              SWEPT!!!
            </Link>
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
            <Link to="/snow">
              SNOW
            </Link>
          </a>

          {/* IMPLEMENT LOGIC TO DISPLAY IF LOGGED IN */}
          <a
            href="#"
            rel="noopener noreferrer"
            className='nav-item nav-links'
          >
            <Link to='/me'>
              PROFILE
            </Link>
          </a>

          <div className='login-btn'>
            <a
              href="#"
              rel="noopener noreferrer"
              className='nav-item nav-links login-btn-link'
            >
              <Link to='/login'>
                SIGN UP
              </Link>
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