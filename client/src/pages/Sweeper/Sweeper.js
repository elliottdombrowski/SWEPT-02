import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import FindZipForm from '../../components/FindZipForm/FindZipForm';
import FindWardForm from '../../components/FindWardForm/FindWardForm';
// import Display from "../../components/Display/Display";
import './sweeper.css';

const arrow = <FontAwesomeIcon icon={faArrowUp} />

const Sweeper = () => {
  const [findZip, setFindZip] = useState(false);
  const changeForm = findZip ? 'zip code' : 'ward';

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-form-wrapper'>
        {findZip ? (
          <FindZipForm />
        ) : (
          <FindWardForm />
        )}

        <a
          href="#"
          rel="noopener noreferrer"
          className='find-ward'
          onClick={() => setFindZip(prev => !prev)}
        >
          Don't know your {changeForm}?
          <span className='sweeper-arrow'>{arrow}</span>
        </a>
      </div>

    </div>
  );
};

export default Sweeper;


import './findzipform.css';

import { GET_ZIP } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const dataContext = React.createContext()

const FindZipForm = () => {
  const zipNumber = useRef('');
  const [zips, setZips] = useState('');
  const { loading, data } = useQuery(GET_ZIP, {
    variables: { zipNumber: zips }
  });

  const zipInfo = data?.getZip || [];
  console.log(zipInfo);

  const zipNumberSubmit = async (event) => {
    event.preventDefault();
    console.log(zipNumber.current.value);
    setZips(zipNumber.current.value)
    return true;
  };

  return (
    <>
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
      <div>
        {
          zipInfo.map((info, index) => {
            return (
              <div className='sweeper-data-output-wrapper' key={index}>
                <h4>{info.zipcode} belongs to ward:</h4>
                <h3>{info.ward}</h3>
              </div>
            )
          })
        }
      </div>
    </>
  );