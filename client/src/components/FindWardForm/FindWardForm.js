import React, { useRef, useState } from 'react';
import Display from "../Display/Display";

import './findwardform.css';

import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const FindWardForm = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [gottenInfo, setGottenInfo] = useState([]);
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  setGottenInfo((wardInfo))
  console.log(gottenInfo);



  const wardNumberSubmit = async (event) => {
    event.preventDefault();
    console.log(wardNumber.current.value);
    setWard(wardNumber.current.value);
    return true;
  };

  return (
    <>
      <form
        onSubmit={(event) => wardNumberSubmit(event)}
        className='sweeper-ward-form'
      >
        <input
          // value={wardNumber}
          ref={wardNumber}
          name='wardNumber'
          // onChange={(event) => setWardNumber(event.target.value)}
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

    </>
  );
};

export default FindWardForm;