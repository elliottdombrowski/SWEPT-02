import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import '../LoginForm/loginform.css';


const LoginForm = () => {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [signup, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationRes = await signup({
      variables: {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      },
    });
    const token = mutationRes.data.signup.token;
    Auth.login(token);
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
            disabled={!(signupData.username && signupData.email && signupData.password)}
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