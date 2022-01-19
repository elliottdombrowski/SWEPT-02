import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast, Spinner } from '@chakra-ui/react';
import { GET_WARD, QUERY_USER_SWEEPERS } from '../../utils/queries';
import { SAVE_SWEEPER } from '../../utils/mutations';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import reactDom from 'react-dom';


const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [saveSweeper, { data: saveSweeperData }] = useMutation(SAVE_SWEEPER);
  const [getSweepers] = useLazyQuery(QUERY_USER_SWEEPERS)
  // const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';
  const [err, setErr] = useState('');
  const [updatedSweepers, setUpdatedSweepers] = useState();

  const toast = useToast();
  const id = 'toast';

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

    if (localStorage.getItem('id_token')) {
      const userInputtedWardNumber = wardNumber.current.value
      console.log(uuid)
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
          //CALL CHAKRA UI TOAST ON SAVE SUCCESS
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Saved your Search to your Profile!',
              position: 'bottom-left',
              status: 'success',
              duration: 2000,
              isClosable: false,
            });
          }
        } catch (err) {
          //CALL CHAKRA UI TOAST ON SAVE FAILURE
          if (!toast.isActive(id)) {
            toast({
              title: 'Unable to save your Search!',
              position: 'bottom-left',
              status: 'error',
              duration: 2000,
              isClosable: false,
            });
          }
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
          console.log(saveSweeper)
          setUpdatedSweepers(saveSweeper);
          //CALL CHAKRA UI TOAST ON SAVE SUCCESS
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Saved your Search to your Profile!',
              position: 'bottom-left',
              status: 'success',
              duration: 2000,
              isClosable: false,
            });
          }
        } catch (err) {
          //CALL CHAKRA UI TOAST ON SAVE FAILURE
          if (!toast.isActive(id)) {
            toast({
              title: 'Unable to save your Search!',
              position: 'bottom-left',
              status: 'error',
              duration: 2000,
              isClosable: false,
            });
          }
          console.log(err)
        }
      }
    } else {
      //CALL CHAKRA UI TOAST IF NOT LOGGED IN
      if (!toast.isActive(id)) {
        toast({
          title: 'You must be logged in!',
          position: 'bottom-left',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          onCloseComplete: () => window.location.assign('/login')
        });
      }
      // window.location.assign("/login")
    }
  }
  useEffect(() => {
    if (saveSweeperData) {
      getSweepers()
    }

  }, [saveSweeperData])

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
        <Spinner
          color='blue.500'
          emptyColor='gray.200'
          size='xl'
          thickness='5px'
          speed='0.6s'
          className='loading-spinner'
        />
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