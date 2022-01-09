import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './navbar.css';
import './query.css';

const profile = <FontAwesomeIcon icon={faUserCircle} className='fa-lg' />

const Navbar = () => {
  const mobileMenu = () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navbar-right').classList.toggle('active');
  };

  const mobileNavChangePage = () => {
    document.getElementById('mobile-nav-snow').classList.toggle('active');
    document.getElementById('mobile-nav-sweeper').classList.toggle('active');
    const overlay = document.getElementById('nav-overlay');

    if (document.getElementById('mobile-nav-snow').classList.contains('active')) {
      overlay.style.right = '0';
      overlay.style.left = '50%';
      document.getElementById('mobile-nav-sweeper').classList.remove('active');
    }
    if (document.getElementById('mobile-nav-sweeper').classList.contains('active')) {
      overlay.style.left = '0';
      overlay.style.right = '50%';
      document.getElementById('mobile-nav-snow').classList.remove('active');
    }
  };

  const mobile = window.matchMedia("(max-width: 768px)");

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
        <div className='nav-right' id='navbar-right'>
          {mobile.matches ? (
            <div className='nav-right-mobile'>
              <Link to='/sweeper' className='nav-item nav-links nav-mobile mobile-page-links mobile-nav-sweeper' id='mobile-nav-sweeper' onClick={() => mobileNavChangePage()}>
                SWEEPER
              </Link>

              <Link to='/snow' className='nav-item nav-links nav-mobile mobile-page-links mobile-nav-snow' id='mobile-nav-snow' onClick={() => mobileNavChangePage()}>
                SNOW
              </Link>
              <div className='nav-right-mobile-overlay' id='nav-overlay'>
              </div>
            </div>
          ) : (
            <Link to="/snow" className='nav-item nav-links'>
              SNOW
            </Link>
          )}

          {/* IMPLEMENT LOGIC TO DISPLAY IF LOGGED IN */}
          {mobile.matches ? (
            <Link to='/me' className='nav-item nav-links'>
              {profile}
            </Link>
          ) : (
            <Link to='/me' className='nav-item nav-links'>
              PROFILE
            </Link>
          )}

          {Auth.loggedIn() ? (
            <div className='login-btn'>
              <Link to='/login' className='nav-links'>
                LOG IN
              </Link>
            </div>
          ) : (
            <div className='login-btn'>
              <Link to='/login' className='nav-links'>
                SIGN UP
              </Link>
            </div>
          )}

        </div>
        <div
          className='hamburger'
          id="hamburger"
          onClick={() => mobileMenu()}
        >
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </header>
      <div className='deco'>
        <div className='deco-inner'></div>
      </div>
    </div>
  );
};

export default Navbar;