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