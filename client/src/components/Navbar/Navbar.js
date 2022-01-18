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
  const [moveSlider, setMoveSlider] = useState(false);

  const mobile = window.matchMedia("(max-width: 768px)");
  const mobileMenu = () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navbar-right').classList.toggle('active');
  };
  
  //CLOSE NAV MENU ON SCROLL
  window.onscroll = () => {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navbar-right').classList.remove('active');
  };
  //CLOSE NAV MENU IF USER CLICKS ANYWHERE OUTSIDE OF NAV CONTAINER
  window.onclick = (event) => {
    if (event.target !== document.getElementById('hamburger') && event.target !== document.getElementById('bar1') && event.target !== document.getElementById('bar2') && event.target !== document.getElementById('bar3')) {
      setTimeout(() => {
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('navbar-right').classList.remove('active');
      }, 300)
    }
  }

  return (
    <div className='navbar-wrapper'>
      <header className='navbar-header' id='navbar-header' >
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
              onClick={() => setMoveSlider(false)}
            >
              SWEEPER
            </Link>

            <Link
              to='/snow'
              className='slider slider-two nav-item nav-links'
              id='snow-link'
              onClick={() => setMoveSlider(true)}
            >
              SNOW
            </Link>
            <div className={moveSlider ? 'switch-overlay-right' : 'switch-overlay-left'} id='switcher' />
          </label>

          {mobile.matches ? (
            <Link to={Auth.loggedIn() ? ('/me') : ('/login')} className='nav-item nav-links profile-icon'>
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
          <span className='bar' id='bar1'></span>
          <span className='bar' id='bar2'></span>
          <span className='bar' id='bar3'></span>
        </div>
      </header>
      <div className='deco'>
        <div className='deco-inner'></div>
      </div>
    </div>
  );
};

export default Navbar;