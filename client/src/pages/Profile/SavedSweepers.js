import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER_SWEEPERS} from '../../utils/queries';
import Auth from '../../utils/auth';
import LoginSignup from '../LoginSignup/LoginSignup';

const SavedSweepers = () => {
    
}