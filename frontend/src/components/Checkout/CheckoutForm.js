import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// create stripe object once when app is loaded 
const stripePromise = loadStripe(process.env.STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  } 

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions}/>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

export default CheckoutForm
