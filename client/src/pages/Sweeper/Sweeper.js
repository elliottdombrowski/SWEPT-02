import React, { useEffect, useState } from 'react';
import FindZipForm from '../../components/FindZipForm/FindZipForm';
import { Input } from '@chakra-ui/react';
import './sweeper.css';

const Sweeper = () => {
  const [findZip, setFindZip] = useState(false);

  // useEffect({
  //   setFindZip(false)
  // }, [])

  return (
    <div className='sweeper-wrapper'>
      <div className='sweeper-data-wrapper'>
        <form className='sweeper-ward-form'>
          <input
            // value={}
            // onChange={}
            placeholder="Enter your Ward Number!"
            className='ward-input'
          />
        </form>

        {findZip ? (
          <FindZipForm />
        ) : (
          <a
            href='#'
            rel='noopener noreferrer'
            className='find-ward'
            onClick={() => setFindZip(true)}
          >
            don't know your ward number?
          </a>
        )}
      </div>
    </div>
  );
};

export default Sweeper;