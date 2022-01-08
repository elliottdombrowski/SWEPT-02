import React, { useEffect, useState } from 'react';
import FindZipForm from '../../components/FindZipForm/FindZipForm';
import FindWardForm from '../../components/FindWardForm/FindWardForm';
import './sweeper.css';

const Sweeper = () => {
  const [findZip, setFindZip] = useState(false);
  const changeForm = findZip ? 'zip code' : 'ward';

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-data-wrapper'>
        {findZip ? (
          <FindZipForm />
        ) : (
          <FindWardForm />
        )}

        <a 
          href="#"
          rel="noopener noreferrer"
          className='find-ward'
          onClick={() => setFindZip(true)}
        >
          Don't know your {changeForm}?
        </a>
      </div>
    </div>
  );
};

export default Sweeper;