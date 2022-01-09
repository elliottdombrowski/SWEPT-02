import React, { useState, useEffect } from 'react';
import './findwardform.css';

const FindWardForm = () => {
  return (
    <form 
      onSubmit={() => console.log('clicking')} 
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