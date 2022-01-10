import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './loginform.css';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const { data } = await login({
        variables: { ...signupData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }

    setSignupData({
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
            name='username'
            onChange={handleInputChange}
            value={signupData.username}
            required
            placeholder='Your Name'
            className='login-input'
          />

          <input
            type='text'
            name='email'
            onChange={handleInputChange}
            value={signupData.email}
            required
            placeholder='Your Email'
            className='login-input'
          />
          
          <input
            type='text'
            name='password'
            onChange={handleInputChange}
            value={signupData.password}
            required
            placeholder='Your Password'
            className='login-input'
          />

          <button
            disabled={!(signupData.email && signupData.password)}
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