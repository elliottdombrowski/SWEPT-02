import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const PUBLIC_KEY_TEST = 'pk_test_51KHYhgClOt2kJmiDPmidphPbalsnQh3IER3uhYKamBl1tZmeBwGC8lfGDsfAg1Pw0easHAUVHZ3l2AUeKyaiG7hr009TLK7LxE';
const PUBLIC_KEY = 'pk_live_51KHYhgClOt2kJmiDMb2aHj9BnjAj34yPNR4AVS5OQCeWzecunPpNUgfDE68k8gaU676dmn7Hgy9HG43rTTTtel5900P85UyaVC';
const stripePromise = loadStripe(PUBLIC_KEY_TEST);

const DonationButton = ({ itemId, amount }) => {
  const handleClick = async (event) => {
    const stripe = await StripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemId, quantity: 1 }],
        mode: 'payment',
        successUrl: window.location.protocol + "//swept.herokuapp.com/merge",
        cancelUrl: window.location.protocol + "//swept.herokuapp.com/merge",
        submitType: 'donate',
      })
      .then(function (res) {
        if (res.error) {
          console.log(res);
        }
      });
  };
  return (
    <button
      onClick={handleClick}
    >
      Donate ${amount}
    </button>
  )
}

const StripeContainer = () => {
  return (
    <>
      <div>
        <DonationButton
          amount={'$5.00'}
          itemId="price_1IUx1FJ2iOysJZvP1LD3EzTR"
        />
      </div>
    </>
  );
};

export default StripeContainer;