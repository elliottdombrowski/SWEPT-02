import React, { useState, useEffect } from 'react';
import SignUpButton from '../../components/SignUpButton/SignUpButton';
import './homepage.css';

const Homepage = () => {
  return (
    <div className='homepage-wrapper'>
      <div className='homepage-img'>
        <img src={require('../../assets/minchi.png')}></img>
      </div>
      <div className='homepage-text-wrapper'>
        <div className='homepage-header'>
          <h1>Welcome to <span className='swept-header'>SWEPT!!!</span></h1>
        </div>

        <div className='homepage-bio-wrapper'>
          <h3 className='homepage-secondary-header'>
            <i className='swept-header'>SWEPT</i> is a tool for Chicagoans, built by Chicagoans.
          </h3>

          <div className='homepage-bio'>
            <h4>
              If you live in the third largest Metropolitan areas in the U.S, you're no stranger
              to parking tickets; and <i className='swept-header'>SWEPT</i> is here to help!
              <br />
              We use real time <a
                href='https://data.cityofchicago.org/'
                target='_blank'
                rel='noopener noreferrer'
                className='chicago-link'
              >
                City of Chicago data
              </a> to tell you <i href='accent-header'>where</i> your car shouldn't be, <i href='accent-header'>when</i> it
              shouldn't be there!
            </h4>

            <h4 className='get-started'>
              Avoid parking tickets now- <br /> Enter your zipcode, ward number, or street name!
            </h4>
            <div className='homepage-signup'>
              <SignUpButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;