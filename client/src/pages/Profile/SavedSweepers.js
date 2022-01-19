import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_SWEEPERS } from '../../utils/queries';

const SavedSweepers = () => {
    const [userId, setUserId] = useState(localStorage.getItem('uuid'));

    const { loading, data } = useQuery(QUERY_USER_SWEEPERS, {
        variables: { user: userId },
    });

    const userSweepers = data?.getUserSweepers || [];
    console.log(userSweepers)

    return (
        <>
            <div className='recent-search-wrapper'>
                <div className='recent-search-header'>
                    <h1 className='recent-searches'>Recent Searches</h1>
                    {
                        userSweepers.map((singleSweeper) => {
                            return (

                                <div key={singleSweeper._id}>
                                    <p>{singleSweeper._id}</p>
                                    <h2>Ward: {singleSweeper.ward}</h2>
                                    <h3>{singleSweeper.month_name}</h3>
                                    <h4>on dates: {singleSweeper.dates}</h4>
                                    <button onClick={() => alert(singleSweeper._id)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SavedSweepers;