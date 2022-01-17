import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Input } from '@chakra-ui/react';
import { ADD_USER } from '../../utils/mutations';
import { validateEmail } from '../../utils/helpers';
import Auth from '../../utils/auth';

const LoginForm = () => {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(signupData.email)) {
      setErr('Please enter a valid Email!');
      return false;
    }
    if (signupData.password.length < 5) {
      setErr('Password must be at least 5 characters!');
      return false;
    }

    const { data } = await addUser({
      variables: { ...signupData },
    });
    console.log(data);
    Auth.login(data.addUser.token);
  };
  
  return (
    <form className='login-form' onSubmit={handleFormSubmit}>
          <p className='error-msg'>{err}</p>
          <Input
            size='xl'
            type='text'
            name='username'
            onChange={handleInputChange}
            value={signupData.username}
            required
            placeholder='Your Name'
            className='login-input'
          />

          <Input
            size='xl'
            type='text'
            name='email'
            onChange={handleInputChange}
            value={signupData.email}
            required
            placeholder='Your Email'
            className='login-input'
          />
          
          <Input
            size='xl'
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
            Sign Up
          </button>
        </form>
  );
}

export default LoginForm;