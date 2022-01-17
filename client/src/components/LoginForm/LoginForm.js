import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import { validateEmail } from '../../utils/helpers';
import Auth from '../../utils/auth';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(loginData.email)) {
      setErr('Please enter a valid Email!');
      return false;
    }
    try {
      const { data } = await login({
        variables: { ...loginData },
      });
      // save user id to local storage for db match + store
      localStorage.setItem('uuid', data.login.user._id)

      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }

    setLoginData({
      username: '',
      email: '',
      password: '',
    })
    setErr('');
  };

  return (
    <form className='login-form' onSubmit={handleFormSubmit}>
      <p className='error-msg'>{err}</p>
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
  );
}

export default LoginForm;