import React, { useEffect, useState, useRef } from 'react';
import Auth from '../../utils/auth';
import { GET_SNOW } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import './query.css';

const Snow = () => {
  const snowNumber = useRef('');
  const [snow, setSnow] = useState('');
  const { loading, data } = useQuery(GET_SNOW, {
    variables: { snowNumber: snow }
  });
  const snowInfo = data?.getSnow || [];

  const snowNumberSubmit = async (event) => {
    event.preventDefault();
    setSnow(snowNumber.current.value);
    return true;
  };
  const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-form-wrapper'>
        <div className='zip-form-wrapper'>
          <form
            onSubmit={(event) => snowNumberSubmit(event)}
            className='zipform-wrapper'
          >
            <input
              ref={snowNumber}
              name='wardNumber'
              placeholder='Enter your Street Name!'
              className='zipform-input'
            />
            <button
              type='submit'
              className='zipform-input zipform-btn'
            >
              Find your schedule!
            </button>
          </form>
        </div>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className='sweeper-data-output-wrapper'>
          {
            snowInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <h4>Month: {info.month_name}</h4>
                  <h3>Dates: {info.dates}</h3>
                  <h2>Ward: {info.ward}</h2>
                  <button className='login-btn save-btn'>{saveBtn}</button>
                </div>
              )
            })
          }
        </div>
      )}
    </div >
  );
};

export default Snow;