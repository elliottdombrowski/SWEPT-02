import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../utils/mutations';
import './loginform.css';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  // const [login, { error, data }] = useMutation(LOGIN_USER);
  // const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      // const { data } = await login({
      //   variables: { ...loginData },
      // });

      // Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }

    setLoginData({
      username: '',
      email: '',
      password: '',
    })
  };

  return (
    <div className='login-wrapper'>
      <form className='login-form' onSubmit={handleFormSubmit}>
        <input
          type='text'
          name='email'
          onChange={handleInputChange}
          value={loginData.email}
          required
          placeholder='Your Email'
          className='login-input'
        />
        
        <input
          type='text'
          name='password'
          onChange={handleInputChange}
          value={loginData.password}
          required
          placeholder='Your Password'
          className='login-input'
        />

        <button
          disabled={!(loginData.email && loginData.password)}
          type='submit'
          className='login-input login-submit-btn'
        >
          Log In
        </button>

      </form>
    </div>
  );
}

export default LoginForm;