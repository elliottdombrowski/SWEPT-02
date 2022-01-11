import React, { useRef, useState } from 'react';
import './findwardform.css';

import { GET_WARD } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const FindWardForm = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const {loading, data} = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];
  console.log(wardInfo);

  const wardNumberSubmit = async (event) => {
    event.preventDefault();

    // if (!wardNumber) {
    //   return false;
    // } else if (!parseInt(wardNumber)) {
    //   console.log('please enter a ward number');
    //   return false;
    // } else if (wardNumber > 50) {
    //   console.log('invalid ward number');
    //   return false;
    // }
    console.log(wardNumber.current.value);
    setWard(wardNumber.current.value);
    // const { data } = await getWard({
    //   variables: {}
    // })
    // try {
    //   const res = await findWardSchedule(wardNumber);

    //   if (!res.ok) {
    //     throw new Error('something went wrong');
    //   }
    // } catch (err) {
    //   console.log(err);
    // };

    // setWardNumber('');
    return true;
  };

  return (
    <form
      onSubmit={(event) => wardNumberSubmit(event)}
      className='sweeper-ward-form'
    >
      <input
        // value={wardNumber}
        ref={wardNumber}
        name='wardNumber'
        // onChange={(event) => setWardNumber(event.target.value)}
        placeholder="Enter your Ward Number!"
        className='ward-input'
      />

      <button
        type='submit'
        className='ward-input ward-btn'
      >
        Find your schedule!
      </button>
    </form>
  );
};

export default FindWardForm;