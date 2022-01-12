import React, { useRef, useState } from 'react';
import './findstreetform.css';

import { GET_SNOW } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const FindStreetForm = () => {
  return (
    <form
      onSubmit={() => console.log('clicking')}
      className='snow-street-form'
    >
      <input
        // value={}
        // onChange={}
        placeholder="Enter your Street Name!"
        className='street-input'
      />

      <button
        type='submit'
        className='street-input street-btn'
      >
        Find your schedule!
      </button>
    </form>
  );
};

export default FindStreetForm;