import React, { useState, useRef } from 'react';
import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './query.css';

const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');

  //WARD FORM USEQUERY - RENAME KEYWORDS TO USE BOTH QUERIES
  const { loading, data} = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();
    setWard(wardNumber.current.value);

    if (wardInfo.length > 0) {
      for (i = 0; i < wardInfo.length; i++) {
        if (wardInfo[i] == wardNumber) {
          console.log(wardInfo[i]);
        } else console.log('nothing here');
      }
    }
    return true;
  };

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-form-wrapper'>
        <div className='zip-form-wrapper'>
          <form
            onSubmit={(event) => wardNumberSubmit(event)}
            className='zipform-wrapper'
          >
            <input
              ref={wardNumber}
              name='wardNumber'
              placeholder='Enter your Ward Number!'
              className='zipform-input'
            />
            <button
              type='submit'
              className='zipform-input zipform-btn'
            >
              Find your schedule!
            </button>
          </form>
          {/* )} */}
        </div>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className='sweeper-data-output-wrapper'>
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
      )}
    </div >
  );
};

export default Sweeper;