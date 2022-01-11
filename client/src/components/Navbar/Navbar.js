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
  const [switcher, setSwitcher] = useState(false);
  try {
    const headerOverlay = document.getElementById('link-switcher');
    const switchOverlay = document.getElementsByClassName('switch-overlay');
    switcher ? headerOverlay.classList.add('active') : headerOverlay.classList.remove('active');
    if (headerOverlay.classList.contains('active')) {
      switchOverlay.style.right = '0';
      switchOverlay.style.left = '50%';
    }
  } catch {}

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
              onClick={() => setSwitcher(false)}
            >
              SWEEPER
            </Link>

            <Link 
              to='/snow' 
              className='slider slider-two nav-item nav-links' 
              id='snow-link'
              onClick={() => setSwitcher(true)}
            >
              SNOW
            </Link>
            <div className='switch-overlay' />
          </label>

          {mobile.matches ? (
            <Link to='/me' className='nav-item nav-links profile-icon'>
              <div className='login-btn'>
                {profile} PROFILE
              </div>
            </Link>
          ) : (
            <Link to={Auth.loggedIn() ? ('/me') : ('/login')} className='nav-item nav-links'>
              PROFILE
            </Link>
          )}

          {Auth.loggedIn() ? (
            <div className='login-btn'>
              <Link to='/' className='nav-links'>
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