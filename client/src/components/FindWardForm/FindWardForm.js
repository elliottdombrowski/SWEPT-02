import React, { useState, useEffect } from 'react';
import './findwardform.css';

const FindWardForm = () => {
  return (
    <form className='sweeper-ward-form'>
      <input
        // value={}
        // onChange={}
        placeholder="Enter your Ward Number!"
        className='ward-input'
      />

      <button
        type="submit"
        className='ward-input ward-submit'
      >

      </button>
    </form>
  );
};

export default FindWardForm;