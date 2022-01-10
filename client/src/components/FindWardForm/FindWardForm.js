import React, { useState, useEffect } from 'react';
//IMPORTING TEST API CALL
import { findWardSchedule } from '../../utils/API';
import './findwardform.css';

const FindWardForm = () => {
  const [wardNumber, setWardNunber] = useState('');

  const wardNumberInputChange = (event) => {
    const { target } = event;
    setWardNunber(target.value);
  };

  function wardNumberSubmit(event) {
    event.preventDefault();
    console.log(wardNumber);
    findWardSchedule(event, wardNumber);

    setWardNunber('');
  };

  return (
    <form 
      onSubmit={(event) => wardNumberSubmit(event)} 
      className='sweeper-ward-form'
    >
      <input
        value={wardNumber}
        name='wardNumber'
        onChange={wardNumberInputChange}
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