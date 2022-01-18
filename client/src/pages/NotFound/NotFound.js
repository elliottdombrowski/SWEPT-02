import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='notfound-wrapper'>
      <div className='notfound-content'>
        <img className='notfound-img' src={require('../../assets/ogsweeper2.png')}></img>
      </div>
    </div>
  );
};

export default NotFound;