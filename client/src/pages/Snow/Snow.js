import React, { useEffect, useState } from 'react';
import FindStreetForm from '../../components/FindStreetForm/FindStreetForm';
import Auth from '../../utils/auth';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './query.css';

const Snow = () => {
  const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';

  return (
    <div className='snow-wrapper'>
      <div className='snow-form-wrapper'>

        <FindStreetForm />

      </div>

      <div className='snow-data-output-wrapper'>
        <button className='login-btn save-btn'>{saveBtn}</button>
      </div>
    </div>
  );
};

export default Snow;