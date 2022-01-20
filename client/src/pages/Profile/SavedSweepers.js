import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER_SWEEPERS, MUTATION_DELETE_SWEEPER } from '../../utils/queries';

const SavedSweepers = () => {
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));
  const [updatedSweepers, setUpdatedSweepers] = useState();

  const { loading, data } = useQuery(QUERY_USER_SWEEPERS, {
    variables: { user: userId },
    fetchPolicy: 'network-only'
  });

  const userSweepers = data?.getUserSweepers || [];
  const [deleteSweeper, { data: deletedSweeperData, loading: deletedSweeperLoading }] = useMutation(MUTATION_DELETE_SWEEPER)

  const handleDeleteSweeper = (id) => {
    deleteSweeper({ variables: { id } })
    window.location.reload('/sweeper')
  }

  useEffect(() => {
    if (deletedSweeperData) {
      console.log('sweeper deleted')
    }
  }, [deletedSweeperData])


  return (
    <>
      <div className='recent-search-wrapper'>
        <div className='recent-search-header'>
          <h1 className='recent-searches'>Saved Sweeper Searches</h1>
          <h1 className='recent-searches recent-searches-date'>| April 1st - November 30th |</h1>
          {
            userSweepers.map((singleSweeper) => {
              return (
                <div className='sweeper-data-output' key={singleSweeper._id}>
                  <h2 className='sweeper-ward'>Ward {singleSweeper.ward}</h2>
                  <h4 className='sweeper-ward'> on dates: <br /> {singleSweeper.month_name} <br /> {singleSweeper.dates}</h4>
                  <button className='login-btn save-btn' onClick={() => handleDeleteSweeper(singleSweeper._id)}>Delete</button>
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