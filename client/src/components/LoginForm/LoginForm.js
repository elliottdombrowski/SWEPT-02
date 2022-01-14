import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './loginform.css';
import './query.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

     try {
      const { data } = await login({
        variables: { ...loginData },
      });

      Auth.login(data.login.token);
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
      <div className='login-form-wrapper'>
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
    </div>
  );
}

export default LoginForm;