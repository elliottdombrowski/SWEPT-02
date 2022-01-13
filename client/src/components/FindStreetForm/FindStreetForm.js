import React, { useRef, useState } from 'react';
import './findstreetform.css';

import { GET_SNOW } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const dataContext = React.createContext()

const FindStreetForm = () => {
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

  return (
    <>
      <form
        onSubmit={(event) => snowNumberSubmit(event)}
        className='snow-street-form'
      >
        <input
          // value={}
          // onChange={}
          ref={snowNumber}
          name='snowNumber'
          placeholder="Enter your Street Name!"
          className='street-input'
        />

        <button
          type='submit'
          className='street-input street-btn'
        >
          Find your schedule!
        </button>
      </form>
      <div>
        {
          snowInfo.map((info, index) => {
            return (
              <div className='sweeper-data-output-wrapper' key={index}>
                <h2>On: {info.on_street}</h2>
                <h3>From: {info.from_stree}</h3>
                <h3>To: {info.to_street}</h3>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default FindStreetForm;