import React, { useEffect, useState, useRef } from 'react';
import Auth from '../../utils/auth';
import { GET_SNOW } from '../../utils/queries';
import { useQuery } from '@apollo/client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              // value={}
              // onChange={}
              ref={snowNumber}
              name='snowNumber'
              placeholder="Enter your Street Name!"
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
        {loading ? (
          <div>loading...</div>
        ) : (
          <div className='sweeper-data-output-wrapper'>
            {
              snowInfo.map((info, index) => {
                return (
                  <div className='sweeper-data-output' key={index}>
                    <h2>On: {info.on_street}</h2>
                    <h3>From: {info.from_stree}</h3>
                    <h3>To: {info.to_street}</h3>
                    <button className='login-btn save-btn'>{saveBtn}</button>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Snow;