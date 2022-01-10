import React, { useState, useEffect } from 'react';
//IMPORTING TEST API CALL
import { apiKey } from '../../utils/API';
import { findWardSchedule } from '../../utils/API';
import './findwardform.css';

const FindWardForm = () => {
  return (
    <form 
      onSubmit={(event) => findWardSchedule(event)} 
      className='sweeper-ward-form'
    >
      <input
        // value={}
        // onChange={}
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