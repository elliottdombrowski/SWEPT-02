import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { GET_ZIP } from '../../utils/queries';
import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './query.css';

const arrow = <FontAwesomeIcon icon={faArrowUp} />

const dataContext = React.createContext()

const Sweeper = () => {
  const zipNumber = useRef('');
  const wardNumber = useRef('');
  const [zips, setZips] = useState('');
  const [ward, setWard] = useState('');

  //SETS ZIP VS WARD FORM
  const [setForm, setFindForm] = useState(false);
  //SETS LINK MESSAGE
  const changeForm = setForm ? 'zip code' : 'ward';

  //ZIPCODE FORM USEQUERY - RENAME KEYWORDS TO USE BOTH QUERIES
  const { loading: zipLoading, data: zipData } = useQuery(GET_ZIP, {
    variables: { zipNumber: zips }
  });
  const zipInfo = zipData?.getZip || [];
  // console.log(zipInfo);

  //WARD FORM USEQUERY - RENAME KEYWORDS TO USE BOTH QUERIES
  const { loading: wardLoading, data: wardData } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = wardData?.getWard || [];
  // console.log(wardInfo);

  //ZIP FORM SUBMIT
  const zipNumberSubmit = async (event) => {
    event.preventDefault();
    // console.log(zipNumber.current.value);
    setZips(zipNumber.current.value)
    return true;
  };

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();
    // console.log(wardNumber.current.value);
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
          {setForm ? (
            <form
              onSubmit={(event) => zipNumberSubmit(event)}
              className='zipform-wrapper'
            >
              <input
                // value={}
                // onChange={}
                ref={zipNumber}
                name='zipNumber'
                placeholder='Enter your Zip Code!'
                className='zipform-input'
              />
              <button
                type='submit'
                className='zipform-input zipform-btn'
              >
                Find your schedule!
              </button>
            </form>
          ) : (
            <form
              onSubmit={(event) => wardNumberSubmit(event)}
              className='zipform-wrapper'
            >
              <input
                // value={}
                // onChange={}
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
          )}
        </div>

        <a
          href="#"
          rel="noopener noreferrer"
          className='find-ward'
          onClick={() => setFindForm(prev => !prev)}
        >
          Don't know your {changeForm}?
          <span className='sweeper-arrow'>{arrow}</span>
        </a>
      </div>

      {/* RENDER DATA HERE */}
      {setForm ? (
        <div className='sweeper-data-output-wrapper'>
          {
            zipInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <h4>{info.zipcode} belongs to ward:</h4>
                  <h3>{info.ward}</h3>
                </div>
              )
            })
          }
        </div>
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

    </div>
  );
};

export default Sweeper;