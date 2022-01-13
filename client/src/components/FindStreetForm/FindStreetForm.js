import React, { useRef, useState } from 'react';
import './findstreetform.css';

import { GET_SNOW } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const FindStreetForm = () => {
  const snowNumber = useRef("");
  const [snow, setSnow] = useState("");
  const { loading, data } = useQuery(GET_SNOW, {
    variables: { snowNumber: snow }
  });
  const snowInfo = data?.getSnow || [];
  console.log(snowInfo);

  const snowNumberSubmit = async (event) => {
    event.preventDefault();
    setSnow(snowNumber.current.value)
  }
  return (
    <form
      onSubmit={(event) => snowNumberSubmit(event)}
      className='snow-street-form'
    >
      <input
        // value={}
        // onChange={}
        ref={snowNumber}
        placeholder="Enter your Street Name!"
        className='street-input'
      />

      <button
        type='submit'
        className='street-input street-btn'
      >
        Find your schedule!
      </button>
    </form>
  );
};

export default FindStreetForm;






// import React, { useRef, useState } from 'react';
// import './findstreetform.css';

// import { GET_SNOW } from '../../utils/queries';
// import { useQuery } from '@apollo/client';

// const FindSnowForm = () => {
//   const snowNumber = useRef('');
//   const [snow, setSnow] = useState('');
//   const { loading, data } = useQuery(GET_SNOW, {
//     variables: { snowNumber: snow }
//   });
//   const snowInfo = data?.getSnow || [];
//   console.log(snowInfo);

//   const snowNumberSubmit = async (event) => {
//     event.preventDefault();

//     console.log(snowNumber.current.value);
//     setSnow(snowNumber.current.value);

//     return true;
//   };

//   return (
//     <form
//       onSubmit={(event) => snowNumberSubmit(event)}
//       className='snow-street-form'
//     >
//       <input
//         // value={}
//         // onChange={}
//         ref={snowNumber}
//         name='snowNumber'
//         placeholder='Enter your Street Name!'
//         className='street-input'
//       />

//       <button
//         type='submit'
//         className='street-input street-btn'
//       >
//         Find your schedule!
//       </button>
//     </form>
//   );
// };

// export default FindSnowForm;