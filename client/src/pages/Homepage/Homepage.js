import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignUpButton from '../../components/SignUpButton/SignUpButton';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Homepage = () => {
  const [donation, setDonation] = useState({
    name: 'donation to the SWEPT! developers!',
    price: 2
  })

  const handleStripeToken = async (token) => {
    // console.log({ token, addresses });
    const res = await axios.post('http://localhost:3001/', {
      token,
      donation
    });
    const { status } = res.data;
    if (status === 'success') {
      console.log('congrats');
    } else {
      console.log('nah fam');
    }
  };

  return (
    <div className='homepage-wrapper'>
      <div className='homepage-img'>
        <img src={require('../../assets/minchi.png')}></img>
      </div>
      <div className='homepage-text-wrapper'>
        <div className='homepage-header'>
          <h1 className='homepage-welcome'>Welcome to <span className='swept-header'>SWEPT!!!</span></h1>
        </div>

        <div className='homepage-bio-wrapper'>
          <h3 className='homepage-secondary-header'>
            <i className='swept-header'>SWEPT</i> is a tool for Chicagoans, built by Chicagoans.
          </h3>

          <div className='homepage-bio'>
            <div className='bio-col-left'>
              <h4>
                If you live in the third largest Metropolitan areas in the U.S, you're no stranger
                to parking tickets; and <i className='swept-header'>SWEPT</i> is here to help!
                <br />
                We use real time <a
                  href='https://data.cityofchicago.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='chicago-link'
                >
                  City of Chicago data
                </a> to tell you <i href='accent-header'>where</i> your car shouldn't be, <i href='accent-header'>when</i> it
                shouldn't be there!
              </h4>

              <h4 className='get-started'>
                Avoid parking tickets now- <br /> Enter your zipcode, ward number, or street name!
              </h4>
              <div className='homepage-signup'>
                <SignUpButton />
              </div>
            </div>

            <div className='bio-col-right'>
              <div className='col-right-inner'>
                <h4>Save money on parking tickets? Donate and buy the <i className='swept-header'>SWEPT</i> devs a coffee!</h4>
              </div>
              <div className='login-btn donate-btn'>
                <Link to='/payments'>
                  DONATE
                </Link>
              </div>
              <img 
                className='og-sweeper'
                src={require('../../assets/ogsweeper3.png')}
              />
              <StripeCheckout 
                stripeKey='pk_test_51KHYhgClOt2kJmiDPmidphPbalsnQh3IER3uhYKamBl1tZmeBwGC8lfGDsfAg1Pw0easHAUVHZ3l2AUeKyaiG7hr009TLK7LxE'
                token={handleStripeToken}
                billingAddress
                shippingAddress
                amount={donation.price * 100}
                name={donation.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;