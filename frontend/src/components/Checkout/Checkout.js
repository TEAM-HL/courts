import React from 'react'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import Preview from '../Checkout/Preview'
import CheckoutForm from './CheckoutForm'

// create stripe object once when app is loaded 
const stripePromise = loadStripe(process.env.STRIPE_KEY);

const Checkout = () => {
    return (
        <div>
            <Preview />
            {/* <CheckoutForm /> */}
        </div>
    )
}

export default Checkout
