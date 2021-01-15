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
    <div className="container col s12 m6">
      <form onSubmit={handleSubmit}>
        <CardElement/>
        <button className="waves-effect waves-light btn" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm
