import React, { useState, useEffect } from 'react';
import './homepage.css';

const Homepage = () => {
  return (
    <div className='homepage-wrapper'>
      <div className='homepage-header'>
        <h1>Welcome to <span className='swept-header'>SWEPT!!!</span></h1>
      </div>
      <div className='homepage-img'>
        <div className='homepage-img-inner'></div>
        <img src={require('../../assets/minchi.png')}></img>
      </div>
      <div className='homepage-bio'>
        <h3>
          <i className='swept-header'>SWEPT</i> is a tool for Chicagoans, built by Chicagoans.
        </h3>

        <h4>
          If you live in the third largest Metropolitan areas in the U.S, you're no stranger
          to parking tickets; and <i className='swept-header'>SWEPT</i> is here to help!
          <br />
          We use real time <a 
            href='#'
            rel='noopener noreferrer'
            className='chicago-link'
          >
            City of Chicago data
          </a> to tell you <i href='accent-header'>where</i> your car shouldn't be, <i href='accent-header'>when</i> it
          shouldn't be there!
        </h4>

        <h5 className='get-started'>
          Get started now- <br /> Enter your zipcode, ward number, or street name!
        </h5>
      </div>
    </div>
  );
};

export default Homepage;