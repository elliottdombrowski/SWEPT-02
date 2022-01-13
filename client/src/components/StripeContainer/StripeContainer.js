import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PUBLIC_KEY = 'pk_live_51KHYhgClOt2kJmiDMb2aHj9BnjAj34yPNR4AVS5OQCeWzecunPpNUgfDE68k8gaU676dmn7Hgy9HG43rTTTtel5900P85UyaVC';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;