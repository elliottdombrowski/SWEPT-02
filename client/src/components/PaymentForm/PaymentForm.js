import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post('http://localhost:4000/payment', {
          amount: 1000,
          id: id
        });

        if (res.data.success) {
          console.log('successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log("error- ", +error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : ()}
    </>
  );
};

export default PaymentForm;