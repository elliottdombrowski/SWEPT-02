import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_SNOW } from '../../utils/queries';

const SavedSnow = () => {
    const [userId, setUserId] = useState(localStorage.getItem('uuid'));

    const { loading, data } = useQuery(QUERY_USER_SNOW, {
        variables: { user: userId },
    });

    const userSnow = data?.getUserSnow || [];


    return (
        <>
            {
                userSnow.map((singleSnow, index) => {
                    return (
                        <div className='recent-search-wrapper'>
                            <div className='recent-search-header'>
                            <h1 className='recent-searches'>Recent Searches</h1>
                            <div key={index}>
                                <h2>On {singleSnow.on_street}</h2>
                                <h3>From {singleSnow.from_stree}</h3>
                                <h4>To {singleSnow.to_street}</h4>
                            </div>
                            </div>
                        </div>

                    )
                })
            }
        </>
    )

}

export default SavedSnow