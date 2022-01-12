import React, { useState, useEffect } from 'react';
// import React, { useRef, useState } from 'react';
import './findzipform.css';



const FindZipForm = () => {
  return (
    <form
      onSubmit={() => console.log('clicking')}
      className='zipform-wrapper'
    >
      <input
        // value={}
        // onChange={}
        placeholder='Enter your Zip Code!'
        className='zipform-input'
      />

      <button
        type='submit'
        className='zipform-input zipform-btn'
      >
        Find your schedule!
      </button>
    </form>
  );
};

export default FindZipForm;