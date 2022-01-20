import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToast, Spinner } from '@chakra-ui/react';
import Auth from '../../utils/auth';
import { GET_SNOW } from '../../utils/queries';
import { SAVE_SNOW } from '../../utils/mutations'
import { useQuery, useMutation } from '@apollo/client';

import './query.css';

// Import mapbox - must add exclamation point to exclude from transpilation and disable esline rule 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// set the access token
mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNreWt2ejV4MjJ6eHYydnBtcmVnZmNzejYifQ.LwzcX603o5VIt1PDFd-9CA';

const Snow = () => {
  const snowNumber = useRef('');
  const [snow, setSnow] = useState('');
  const [err, setErr] = useState('');
  const [saveSnow] = useMutation(SAVE_SNOW);

  const toast = useToast();
  const id = 'toast';
  // const saveBtn = Auth.loggedIn ? 'SAVE' : 'LOG IN TO SAVE YOUR RESULTS';

  //SNOW / STREET FORM USERQUERY
  const { loading, data } = useQuery(GET_SNOW, {
    variables: { snowNumber: snow }
  });
  const snowInfo = data?.getSnow || [];

  //SNOW / STREET FORM SUBMIT
  const snowNumberSubmit = async (event) => {
    event.preventDefault();

    if (parseInt(snowNumber.current.value)) {
      setErr('Please enter a valid City of Chicago Street Name!');
      return false;
    }

    setSnow(snowNumber.current.value);
    setErr('');
    return true;
  };

  // save snow fx
  const saveBtn = async (val) => {
    const isLoggedIn = localStorage.getItem('id_token');
    const uuid = localStorage.getItem('uuid');
    if (isLoggedIn) {
      try {
        // save this to mongodb
        await saveSnow({
          variables: {
            on_street: val.on_street,
            from_stree: val.from_stree,
            to_street: val.to_street,
            restrict_t: val.restrict_t,
            // local storage atm
            user: uuid
          }
        })
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Saved your Search to your Profile!',
            position: 'bottom-left',
            status: 'success',
            duration: 2000,
            isClosable: false,
          });
        }
      } catch (err) {
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Unable to save your Search!',
            position: 'bottom-left',
            status: 'error',
            duration: 2000,
            isClosable: false,
          });
        }
        console.log(err)
      }
    } else {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'You must be logged in!',
          position: 'bottom-left',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          onCloseComplete: () => window.location.assign('/login')
        });
      }
    }
  }
  // MAPBOX
  // set default lat, long, and zoom for map - Chicago
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-87.62);
  const [lat, setLat] = useState(41.88);
  const [zoom, setZoom] = useState(8);

  // initialize the map, code will be invoked right after app is inserted in DOM tree of html page
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
  });

  // function that stores the lat, lng, and zoom from user input
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className='sweeper-wrapper'>


      <div className='sweeper-form-wrapper'>
        <div className='zip-form-wrapper'>
          <form
            onSubmit={(event) => snowNumberSubmit(event)}
            className='zipform-wrapper'
          >
            <input
              ref={snowNumber}
              name='wardNumber'
              placeholder='Enter your Street Name!'
              className='zipform-input'
            />
            <button
              type='submit'
              className='zipform-input zipform-btn'
            >
              Find your schedule!
            </button>
            <p className='error-msg'>{err}</p>
          </form>
        </div>
      </div>
      {loading ? (
        <Spinner 
          color='blue.500' 
          emptyColor='gray.200'
          size='xl' 
          thickness='5px'
          speed='0.6s'
          className='loading-spinner'
        />  
      ) : (
        <div className='sweeper-data-output-wrapper'>
          <span className='form-warning'>{!snowInfo.length ? 'No results yet!' : ''}</span>
          {
            snowInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <span className='sweeper-date'>Parking Restricted on: {info.on_street}</span>
                  {/* INTENTIONAL TYPO- TO MATCH TYPO IN API  */}
                  <span className='sweeper-ward'>From: {info.from_stree}</span>
                  <span className='sweeper-ward'>To: {info.to_street}</span>
                  {/* <h3>From: {info.from_stree}</h3>
                  <h3>To: {info.to_street}</h3> */}
                  <span className='sweeper-ward'>Restricted with {info.restrict_t}ES of snow.</span>
                  <button className='login-btn save-btn' onClick={() => saveBtn(info)}>Save</button>
                </div>
              )
            })
          }
        </div>
      )}
      {/* Mapbox */}
      <div className='outer-map-container'>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div >
  );
};

export default Snow;