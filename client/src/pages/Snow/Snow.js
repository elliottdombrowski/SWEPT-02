import React, { useEffect, useState } from 'react';
import FindStreetForm from '../../components/FindStreetForm/FindStreetForm';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './snow.css';
import './query.css';

const Snow = () => {
  
  return (
    <div className='snow-wrapper'>
      <div className='snow-form-wrapper'>

        <FindStreetForm />

      </div>

      <div className='snow-data-output-wrapper'>
        hi there it works. there's a container here.
      </div>
    </div>
  );
};

export default Snow;