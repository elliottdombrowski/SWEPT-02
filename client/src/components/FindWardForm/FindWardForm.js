import React, { useRef, useState } from 'react';

import './findwardform.css';

import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const dataContext = React.createContext()

const FindWardForm = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];
  console.log(wardInfo);

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
      <div>
        {
          wardInfo.map((info, index) => {
            return (
              <div className='sweeper-data-output-wrapper' key={index}>
                <h3>Dates: {info.dates}</h3>
                <h4>Month_Date: {info.month_name}</h4>
                <h2>Ward: {info.ward}</h2>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default FindWardForm;