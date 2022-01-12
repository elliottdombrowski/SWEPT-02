import React, { useState, useEffect } from 'react';
import './findzipform.css';

const FindZipForm = () => {
  return (
    <form
      onSubmit={() => console.log('clicking')}
      className='zipform-wrapper'
    >
      <input
        // value={}
        // onChange={}
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
  );
};

export default FindZipForm;


// sadie did this thing and it's crapola
// ripped copy and edit from FindWardForm btw
// // import React, { useState, useEffect } from 'react';
// import React, { useRef, useState } from 'react';
// import './findzipform.css';

// import { GET_ZIP } from '../../utils/queries';
// import { useQuery } from '@apollo/client';

// const FindZipForm = () => {
//   const zipNumber = useRef('');
//   const [zip, setZip] = useState('');
//   const { loading, data } = useQuery(GET_ZIP, {
//     variables: { zipNumber: zip }
//   });
//   const zipInfo = data?.getZip || [];
//   console.log(zipInfo);

//   const zipNumberSubmit = async (event) => {
//     event.preventDefault();

//     console.log(zipNumber.current.value);
//     setZip(zipNumber.current.value);



// export default FindZipForm;