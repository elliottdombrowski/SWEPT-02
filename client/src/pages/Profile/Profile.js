import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className='profile-wrapper'>
        <div className='profile-info-wrapper'>
            <div className='profile-welcome-header'>
              <h1>Welcome, Name!</h1>
            </div>
        </div>
        <div className='recent-search-wrapper'>
            <div className='recent-search-header'>
              <h1>Recent Searches</h1>
            </div>
        </div>
    </div>
  );
};

export default Profile;