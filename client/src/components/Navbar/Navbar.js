import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SignUpButton from '../SignUpButton/SignUpButton';
import Auth from '../../utils/auth';
import './navbar.css';
import './query.css';

const profile = <FontAwesomeIcon icon={faUserCircle} className='fa-lg' />

const Navbar = () => {
  const mobile = window.matchMedia("(max-width: 768px)");
  const mobileMenu = () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navbar-right').classList.toggle('active');
  };

  let switchOverlay = document.getElementsByClassName('switch-overlay');

  const setOverlayLeft = () => {
    switchOverlay.style.left = '0';
    switchOverlay.style.right = '50%';
  }
  
  const setOverlayRight = () => {
    switchOverlay.style.left = '50%';
    switchOverlay.style.right = '0';
  }

  return (
    <div className='navbar-wrapper'>
      <header className='navbar-header'>
        {/* NAV LEFT */}
        <div className='nav-left'>
          <Link to='/' className='nav-item nav-logo'>
            SWEPT!!!
          </Link>
        </div>

        {/* NAV RIGHT */}
        <div className='nav-right' id='navbar-right'>
          <label className='switch' id='link-switcher'>
            <input type='checkbox' />
            <Link
              to='/sweeper'
              className='slider slider-one nav-item nav-links'
              id='sweeper-link'
              onClick={setOverlayLeft}
            >
              SWEEPER
            </Link>

            <Link
              to='/snow'
              className='slider slider-two nav-item nav-links'
              id='snow-link'
              onClick={setOverlayRight}
            >
              SNOW
            </Link>
            <div className='switch-overlay' id='switch-overlay' />
          </label>

          {mobile.matches ? (
            <Link to='/me' className='nav-item nav-links profile-icon'>
              <div className='login-btn'>
                {profile} PROFILE
              </div>
            </Link>
          ) : (
            <Link to={Auth.loggedIn() ? ('/me') : ('/login')} className='nav-item nav-links nav-profile'>
              PROFILE
            </Link>
          )}

          {Auth.loggedIn() ? (
            <div className='login-btn mobile-login'>
              <Link
                to='/'
                className='nav-links'
                onClick={Auth.logout}
              >
                LOG OUT
              </Link>
            </div>
          ) : (
            <SignUpButton />
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