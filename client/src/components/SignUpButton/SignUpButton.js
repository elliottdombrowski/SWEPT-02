import React from 'react';
import { Link } from 'react-router-dom';

const SignUpButton = () => {
  return (
    <div className='login-btn'>
      <Link to='/login' className='nav-links'>
        SIGN UP
      </Link>
    </div>
  );
};

export default SignUpButton;