import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

let arrow = <FontAwesomeIcon icon={faArrowLeft} />

const NotFound = () => {
  return (
    <div className='notfound-wrapper'>
      <div className='notfound-content'>
        <img className='notfound-img' src={require('../../assets/ogsweeper2.png')}></img>
        <h1 className='notfound-header'>
          Whoops! The page you're looking for doesn't exist.
        </h1>
        <button className='login-btn notfound-btn'>
          <Link to='/' className='notfound-link'>
            {arrow} back to homepage
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;