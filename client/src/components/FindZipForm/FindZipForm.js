import React, { useState, useEffect } from 'react';
import './findzipform.css';

const FindZipForm = () => {
  return (
    <div className='findzipform-wrapper'>
      <form className='zipform-wrapper'>
        <input
          // value={}
          // onChange={}
          placeholder='Enter your Zip Code!'
          className='zipform-input'
        />
      </form>
    </div>
  );
};

export default FindZipForm;