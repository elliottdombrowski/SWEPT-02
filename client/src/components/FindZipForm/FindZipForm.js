import React, { useState, useRef } from 'react';
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
};

export default FindZipForm;









// sadie did this thing and it's crapola
// ripped copy and edit from FindWardForm btw

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

//     return true;
//   };

//   return (
//     <form
//       onSubmit={(event) => zipNumberSubmit(event)}
//       className='zipform-wrapper'
//     >
//       <input
//         // value={}
//         // onChange={}
//         ref={zipNumber}
//         name='zipNumber'
//         placeholder='Enter your Zip Code!'
//         className='zipform-input'
//       />

//       <button
//         type='submit'
//         className='zipform-input zipform-btn'
//       >
//         Find your schedule!
//       </button>
//     </form>
//   );
// };

// export default FindZipForm;