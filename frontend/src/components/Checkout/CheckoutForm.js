import React from 'react'
import api from '../../config/api'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../../assets/css/stripe.css'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    const { data: clientSecret } = await api.post('/create-checkout-session', {
      // amount: pendingBooking.cost * 100 //times 100 to convert to cents
    })
    console.log(clientSecret)
  }

  // save booking function 
   // await api({
        //     method: "POST",
        //     data: bookingData,
        //     withCredentials: true, 
        //     url: "/bookings/new"
        // }).then(res => {
        //     console.log(res)
        //     // if (data passes validation formatting and no prev booking clashes) 
        //     // redirect user to stripe payment
        //     // } 
        // })

  const cardElementOptions = {
    style: {
      base: {
        'color': '#32325d',
        'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
        'fontSmoothing': 'antialiased',
        'fontSize': '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  } 

  return (
    <div className="container col s12 m6">
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col s12 push-m2 m8">
          <CardElement/>
          <button className="waves-effect waves-light btn" type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default CheckoutForm
