import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const PUBLIC_KEY_TEST = 'pk_test_51KHYhgClOt2kJmiDPmidphPbalsnQh3IER3uhYKamBl1tZmeBwGC8lfGDsfAg1Pw0easHAUVHZ3l2AUeKyaiG7hr009TLK7LxE';
const PUBLIC_KEY = 'pk_live_51KHYhgClOt2kJmiDMb2aHj9BnjAj34yPNR4AVS5OQCeWzecunPpNUgfDE68k8gaU676dmn7Hgy9HG43rTTTtel5900P85UyaVC';
const stripePromise = loadStripe(PUBLIC_KEY_TEST);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;