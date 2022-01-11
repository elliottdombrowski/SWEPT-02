import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import './loginsignup.css';

const LoginSignup = () => {
  const [switchAuthForm, setSwitchAuthForm] = useState(false);

  return (
    <div className='login-signup-wrapper'>
      <div className='login-signup-inner'>
        {!switchAuthForm ? <SignupForm /> : <LoginForm />}
        <a
          href='#'
          rel='noopener noreferrer'
          className='login-signup-form-switcher'
          onClick={(event) => setSwitchAuthForm((prev) => !prev)}
        >
          {!switchAuthForm ? 'Already have an account? Log in!' : "Don't have an account? Sign up!"}
        </a>
      </div>
    </div>
  );
};

export default LoginSignup