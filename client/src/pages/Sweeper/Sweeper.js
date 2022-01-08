import React, { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';
import './sweeper.css';

const Sweeper = () => {
  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-data-wrapper'>
        <form className='sweeper-zipcode-form'>
          <input
            // value={}
            // onChange={}
            placeholder="Enter your Zip Code!"
            className='zipcode-input'
          />
        </form>
      </div>
    </div>
  );
};

export default Sweeper;