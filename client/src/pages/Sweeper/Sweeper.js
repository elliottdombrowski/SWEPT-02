import React, { useEffect, useState } from 'react';
import FindZipForm from '../../components/FindZipForm/FindZipForm';
import FindWardForm from '../../components/FindWardForm/FindWardForm';
import './sweeper.css';

const Sweeper = () => {
  const [findZip, setFindZip] = useState(false);

  // useEffect({
  //   setFindZip(false)
  // }, [])

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-data-wrapper'>
        {findZip ? (
          <FindZipForm />
        ) : (
          <FindWardForm />
        )}
      </div>
    </div>
  );
};

export default Sweeper;