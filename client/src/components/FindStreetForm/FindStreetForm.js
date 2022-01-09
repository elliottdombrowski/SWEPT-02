import React, { useState, useEffect } from 'react';
import './findstreetform.css';

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