import { parse } from '@fortawesome/fontawesome-svg-core';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
//IMPORTING TEST API CALL
import { findWardSchedule } from '../../utils/API';
import './findwardform.css';

const FindWardForm = () => {
  const [wardNumber, setWardNumber] = useState('');

  const wardNumberSubmit = async (event) => {
    event.preventDefault();

    if (!wardNumber) {
      return false;
    } else if (!parseInt(wardNumber)) {
      console.log('please enter a ward number');
      return false;
    } else if (wardNumber > 50) {
      console.log('invalid ward number');
      return false;
    }

    try {
      const res = await findWardSchedule(wardNumber);

      if (!res.ok) {
        throw new Error('something went wrong');
      }
    } catch (err) {
      console.log(err);
    };

    setWardNumber('');
    return true;
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