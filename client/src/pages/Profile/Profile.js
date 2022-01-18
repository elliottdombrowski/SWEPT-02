import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_SWEEPERS, QUERY_USER_SNOW } from '../../utils/queries';
import Auth from '../../utils/auth';
import LoginSignup from '../LoginSignup/LoginSignup';

const Profile = () => {
  const { username: userParam } = useParams();


  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading, snowData } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const { loading, sweeperData } = useQuery(QUERY_USER_SWEEPERS, {
    variables: { userId: userParam },
  });

  const user = data?.me || {};

  return (
    <div className='profile-wrapper'>
      <div className='profile-info-wrapper'>
        <div className='profile-welcome-header'>
          <h1 className='profile-header'>Welcome, </h1> <span className='profile-username'>{user.username}!</span>
        </div>
        <p className='profile-email'>{user.email}</p>
      </div>
      <div className='recent-search-wrapper'>
        <div className='recent-search-header'>
          <h1 className='recent-searches'>Recent Searches</h1>
          <p>Placeholder</p>
          <p>Placeholder</p>
          <p>Placeholder</p>
          <p>Placeholder</p>
          <p>Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;