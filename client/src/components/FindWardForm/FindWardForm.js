import React, { useState, useEffect } from 'react';
import Axios from 'axios';
//IMPORTING TEST API CALL
import { findWardSchedule } from '../../utils/API';
import './findwardform.css';

const FindWardForm = () => {
  const [wardNumber, setWardNunber] = useState('');

  const wardNumberInputChange = (event) => {
    const { target } = event;
    const inputValue = target.name;
    setWardNunber(inputValue);
  };

  function wardNumberSubmit(event) {
    event.preventDefault();
    findWardSchedule(event, wardNumber);
    console.log(wardNumber);

    setWardNunber('');
  };

  return (
    <form 
      onSubmit={(event) => wardNumberSubmit(event)} 
      className='sweeper-ward-form'
    >
      <input
        // value={}
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