import React, { useState, useEffect } from 'react';
//IMPORTING TEST API CALL
import { findWardSchedule } from '../../utils/API';
import './findwardform.css';

const FindWardForm = () => {
  const [wardNumber, setWardNumber] = useState('');

  function wardNumberSubmit(event) {
    event.preventDefault();
    (!parseInt(wardNumber) || wardNumber > 50) ? console.log('invalid ward number') : findWardSchedule(event, wardNumber)
    // if (!parseInt(wardNumber)) {
    //   console.log('not a number');
    // } else {
    //   findWardSchedule(event, wardNumber)
    // };

    setWardNumber('');
  };

  return (
    <form 
      onSubmit={(event) => wardNumberSubmit(event)} 
      className='sweeper-ward-form'
    >
      <input
        value={wardNumber}
        name='wardNumber'
        onChange={(event) => setWardNumber(event.target.value)}
        placeholder="Enter your Ward Number!"
        className='ward-input'
      />

      <button
        type='submit'
        className='ward-input ward-btn'
      >
        Find your schedule!
      </button>
    </form>
  );
};

export default FindWardForm;