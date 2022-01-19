import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER_SNOW, MUTATION_DELETE_SNOW } from '../../utils/queries';

const SavedSnow = () => {
    const [userId, setUserId] = useState(localStorage.getItem('uuid'));
    const [updatedSnow, setUpdatedSnow] = useState();

    const { loading, data } = useQuery(QUERY_USER_SNOW, {
        variables: { user: userId },
        fetchPolicy: "network-only"
    });
    const [deleteSnow, { data: deletedSnowData, loading: deletedSnowLoading }] = useMutation(MUTATION_DELETE_SNOW)
    const userSnow = data?.getUserSnow || [];

    const handleDeleteSnow = (id) => {
        deleteSnow({ variables: { id } })
    }
    // setUpdatedSnow(userSnow);
    useEffect(() => {
        if (deletedSnowData) {
            alert("snow deleted")
        }
    }, [deletedSnowData])

    return (
        <>
            {
                userSnow.map((singleSnow) => {
                    return (
                        <div className='recent-search-wrapper'>
                            <div className='recent-search-header'>
                                <h1 className='recent-searches'>Recent Searches</h1>
                                <div key={singleSnow._id}>
                                    <h2>On {singleSnow.on_street}</h2>
                                    <h3>From {singleSnow.from_stree}</h3>
                                    <h4>To {singleSnow.to_street}</h4>
                                </div>
                                <button onClick={() => handleDeleteSnow(singleSnow._id)}>Delete</button>
                            </div>
                        </div>

                    )
                })
            }
        </>
    )

}

export default SavedSnow