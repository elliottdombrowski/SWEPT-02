import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...loginData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    login
  );
}

export default LoginForm;