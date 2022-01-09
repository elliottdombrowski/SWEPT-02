import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import './query.css';

const Navbar = () => {
  const mobileMenu = () => {
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navbar-right').classList.toggle('active');
  };

  // const navClick = () => {
  //   let nav = document.getElementById('nav-right');
  //   let burger = document.getElementById('hamburger');
  //   if (nav.classList.contains('active')) {
  //     nav.classList.remove('active');
  //     burger.classList.remove('active');
  //   };
  // };

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