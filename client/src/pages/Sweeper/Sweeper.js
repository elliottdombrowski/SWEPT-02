import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { GET_WARD } from '../../utils/queries';
import { SAVE_SWEEPER } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import reactDom from 'react-dom';


const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [saveSweeper] = useMutation(SAVE_SWEEPER);
  // const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';
  const [err, setErr] = useState('');
  
  const toast = useToast();

  //WARD FORM USEQUERY
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();

    if (wardNumber.current.value.length == 2 && wardNumber.current.value > 50) {
      setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
      return false;
    }

    //TODO- CHECK ZIPCODE VAL

    setWard(wardNumber.current.value);

    // if (!wardInfo.length) {
    //   setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
    // }

    setErr('');
    return true;
  };

  // save sweeper fx
  const saveBtn = async (val) => {
    const isLoggedIn = localStorage.getItem('id_token');
    const uuid = localStorage.getItem('uuid');
    if (isLoggedIn) {
      const userInputtedWardNumber = wardNumber.current.value
      // if user kicks off second API call with 5+ digit then set equal 
      // or > to the 60000's (per zipcode rules)
      if (userInputtedWardNumber >= 60000) {
        try {
          // save this to mongodb
          await saveSweeper({
            variables: {
              ward: val.ward,
              month_name: val.month_name,
              section: val.section,
              dates: val.dates,
              zipcode: userInputtedWardNumber,
              // local storage atm
              user: uuid
            }
          })
          // temp - can be changed to react modal!
          toast({
            title: 'Saved your Search to your Profile!',
            position: 'bottom-left',
            status: 'success',
            duration: 2000,
            isClosable: false,
          });
        } catch (err) {
          toast({
            title: 'Unable to save your Search!',
            position: 'bottom-left',
            status: 'error',
            duration: 2000,
            isClosable: false,
          });
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
              // empty string for when only sweeper api is kicked off
              zipcode: "",
              // local storage atm
              user: uuid
            }
          })
          //CALL CHAKRA UI TOAST ON SAVE SUCCESS
          toast({
            title: 'Saved your Search to your Profile!',
            position: 'bottom-left',
            status: 'success',
            duration: 2000,
            isClosable: false,
          });
        } catch (err) {
          toast({
            title: 'Unable to save your Search!',
            position: 'bottom-left',
            status: 'error',
            duration: 2000,
            isClosable: false,
          });
          console.log(err)
        }
      }
    } else {
      // temp - can be changed to react modal!
      alert("you are not logged in")
      window.location.assign("/login")
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
            <p className='error-msg'>{err}</p>
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
                  <span className='sweeper-date'>{info.month_name} {info.dates}</span>
                  <p className='sweeper-ward'>Ward {info.ward}</p>
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