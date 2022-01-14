import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER } from '../../utils/queries';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    // variables: { userId: userId },
  });

  const user = data?.user || {};

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className='profile-wrapper'>
        <div className='profile-info-wrapper'>
            <div className='profile-welcome-header'>
              <h1>Welcome, {user.username}!</h1>
            </div>
            <p>{user.email}</p>
        </div>
        <div className='recent-search-wrapper'>
            <div className='recent-search-header'>
              <h1>Recent Searches</h1>
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