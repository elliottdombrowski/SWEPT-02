import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_WARD } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_SWEEPER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [saveSweeper] = useMutation(SAVE_SWEEPER);
  // const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';

  //WARD FORM USEQUERY
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();
    setWard(wardNumber.current.value);
    return true;
  };

  // save sweeper fx
  const saveBtn = () => {
    const userInputtedWardNumber = wardNumber.current.value
    const uuid = localStorage.getItem('uuid');
    if (isLoggedIn) {
      const userInputtedWardNumber = wardNumber.current.value
      // greater than or equal to numbers starting in the 60000's (per zipcode rules)
      if (userInputtedWardNumber >= 60000) {
        try {
          await saveSweeper({
            variables: {
              ward: val.ward,
              month_name: val.month_name,
              section: val.section,
              dates: val.dates,
              // zipcode: userInputtedWardNumber,
              // user: uuid
            }
          })
          alert('Saved successfully')
        } catch (err) {
          alert('Unable to save')
          console.log(err)
        }
      } else {
        try {
          await saveSweeper({
            variables: {
              ward: val.ward,
              month_name: val.month_name,
              section: val.section,
              dates: val.dates,
              // zipcode: '',
              // user: uuid
            }
          })
          alert('Saved successfully')
        } catch (err) {
          alert('Unable to save')
          console.log(err)
        }
      }
    } else {
      alert('you are not logged in')
      window.location.assign('/login')
    }
  }

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
              placeholder='Enter your Ward Number or Zipcode!'
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
            wardInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <h4>Month: {info.month_name}</h4>
                  <h3>Dates: {info.dates}</h3>
                  <h2>Ward: {info.ward}</h2>
                  <button className='login-btn save-btn' onClick={() => saveBtn(info)}>Save</button>
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