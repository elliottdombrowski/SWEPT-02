import React, { useState, useRef, useEffect } from 'react';
import { useToast, Spinner } from '@chakra-ui/react';
import { GET_WARD, QUERY_USER_SWEEPERS } from '../../utils/queries';
import { SAVE_SWEEPER } from '../../utils/mutations';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

// Import mapbox - must add exclamation point to exclude from transpilation and disable esline rule 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// set the access token
mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNreWt2ejV4MjJ6eHYydnBtcmVnZmNzejYifQ.LwzcX603o5VIt1PDFd-9CA';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sweeper = () => {
  const wardNumber = useRef('');
  const [ward, setWard] = useState('');
  const [saveSweeper, { data: saveSweeperData }] = useMutation(SAVE_SWEEPER);
  const [getSweepers] = useLazyQuery(QUERY_USER_SWEEPERS)
  const [err, setErr] = useState('');
  const [updatedSweepers, setUpdatedSweepers] = useState();

  const toast = useToast();
  const id = 'toast';

  //WARD FORM USEQUERY
  const { loading, data } = useQuery(GET_WARD, {
    variables: { wardNumber: ward }
  });
  const wardInfo = data?.getWard || [];

  //WARD FORM SUBMIT
  const wardNumberSubmit = async (event, i) => {
    event.preventDefault();
    if (wardNumber.current.value.length == 2 && wardNumber.current.value > 50) {
      setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
      return false;
    }
    if (wardNumber.current.value.length == 3 || wardNumber.current.value.length == 4 || wardNumber.current.value.length > 5) {
      setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
      return false;
    }
    if (!parseInt(wardNumber.current.value)) {
      setErr('Please enter a valid Chicago Zipcode or Ward Number (1-50)');
      return false;
    }

    setWard(wardNumber.current.value);

    setErr('');
    return true;
  };

  // save sweeper fx
  const saveBtn = async (val) => {
    const isLoggedIn = localStorage.getItem('id_token');
    const uuid = localStorage.getItem('uuid');

    if (localStorage.getItem('id_token')) {
      const userInputtedWardNumber = wardNumber.current.value
      console.log(uuid)
      // if user kicks off second API call with 5+ digit then set equal 
      // or > to the 60000's (per zipcode rules)
      if (userInputtedWardNumber >= 60000) {
        try {
          // save this to mongodb
          await saveSweeper({
            variables: {
              ward: val.ward,
              month_name: val.month_name,
              section: val.section,
              dates: val.dates,
              zipcode: userInputtedWardNumber,
              // local storage atm
              user: uuid
            }
          })
          //CALL CHAKRA UI TOAST ON SAVE SUCCESS
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
          //CALL CHAKRA UI TOAST ON SAVE FAILURE
          if (!toast.isActive(id)) {
            toast({
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
        try {
          await saveSweeper({
            variables: {
              ward: val.ward,
              month_name: val.month_name,
              section: val.section,
              dates: val.dates,
              // empty string for when only sweeper api is kicked off
              zipcode: "",
              // local storage atm
              user: uuid
            }
          })
          console.log(saveSweeper)
          setUpdatedSweepers(saveSweeper);
          //CALL CHAKRA UI TOAST ON SAVE SUCCESS
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
          //CALL CHAKRA UI TOAST ON SAVE FAILURE
          if (!toast.isActive(id)) {
            toast({
              title: 'Unable to save your Search!',
              position: 'bottom-left',
              status: 'error',
              duration: 2000,
              isClosable: false,
            });
          }
          console.log(err)
        }
      }
    } else {
      //CALL CHAKRA UI TOAST IF NOT LOGGED IN
      if (!toast.isActive(id)) {
        toast({
          title: 'You must be logged in!',
          position: 'bottom-left',
          status: 'warning',
          duration: 2000,
          isClosable: true,
          onCloseComplete: () => window.location.assign('/login')
        });
      }
      // window.location.assign("/login")
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

  useEffect(() => {
    if (saveSweeperData) {
      getSweepers()
    }

  }, [saveSweeperData])


  return (
    <main className='sweeper-wrapper'>
      <header className='sweeper-header'>
        <label className='sweeper-header-label'>Find your StreetSweeper Schedule!</label>
      </header>

      <section className='sweeper-form-wrapper'>
        <div className='zip-form-wrapper'>
          <form
            onSubmit={(event) => wardNumberSubmit(event)}
            className='zipform-wrapper'
          >
            <input
              ref={wardNumber}
              name='wardNumber'
              placeholder='Enter your Ward Number or Zipcode!'
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
      </section>
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
        <section className='sweeper-data-output-wrapper'>
          <span className='form-warning'>{!wardInfo.length ? 'No results yet!' : ''}</span>
          {
            wardInfo.map((info, index) => {
              return (
                <div className='sweeper-data-output' key={index}>
                  <span className='sweeper-date'>{info.month_name} {info.dates}</span>
                  <p className='sweeper-ward'>Ward {info.ward}</p>
                  <button className='login-btn save-btn' onClick={() => saveBtn(info)}>Save</button>
                </div>
              )
            })
          }
        </section>
      )}
      {/* Mapbox */}
      <div className='outer-map-container'>
        <div ref={mapContainer} className="map-container" />
      </div>
    </main >
  );
};

export default Sweeper;