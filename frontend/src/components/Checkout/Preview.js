import React, { useState } from 'react'
import { useGlobalState } from "../../config/store"
import {loadStripe} from '@stripe/stripe-js';
import api from '../../config/api'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_thG1zqeSc5ZWjKDe6OENpRPe00rgTugo8l');

const Preview = () => {
    // destructure store and dispatch from globalstate 
    const { store, dispatch } = useGlobalState()

    const { pendingBooking } = store
    const [stripeError, setStripeError] = useState(null)
    
    let previewBookingData = {}
    console.log("pendingBooking ", pendingBooking)
    if (typeof pendingBooking !== null) previewBookingData = pendingBooking
        
    console.log("preview booking data:", previewBookingData)
    const pairs = Object.entries(previewBookingData)
    // create empty object
    const previewTable = []
    // iterate over nested pairs object and push to previewData 
    pairs.map(entry => {
        if (typeof entry[1] ==='object') {
            let nestedObj = Object.entries(entry[1])
            // nestedObj.map(entry => console.log(`${entry[0]}: ${entry[1]}`) )
            nestedObj.map(entry => previewTable.push(entry) )
        } else previewTable.push(entry)
    })
    console.log("previewTable", previewTable) 



    const handlePayClick = async () => {
        console.log("preview: ", previewBookingData)
        localStorage.setItem('pendingBookingData', JSON.stringify(previewBookingData))

        console.log(localStorage.getItem('pendingBookingData'))
        
        // Get Stripe.js instance
        const stripe = await stripePromise;

        const response = await api({
            method: "POST", 
            data: previewBookingData, 
            url: "/checkout/create-checkout-session"
        })
        console.log("response: ", response)
        // Call your backend to create the Checkout Session
        const session = await response
        console.log("check session", session)
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: session.data.id
        }).then(session => {
            console.log("session: ", session)
        })
        if (result.error) {
            console.log(result.error.message)
            setStripeError(result.error.message)
        }
    }
   
    // error message css styles
    const errorStyles = {
        color: "red"
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 push-m2 m8">
                    <h3>Review & Pay</h3>
                    <br/>
                    <p><strong>Please review and pay for your booking</strong></p>
                    <ul className="collection">
                        {
                        previewTable.length > 0 ?
                        (
                            previewTable.map(array => {
                                return (<li className="collection-item">{array[0]}:   {array[1]}</li>)
                            })
                        )
                        : <p></p>
                        }
                    </ul>
                    <div className="row">
                        <button className="btn waves-effect waves-light"><a href="/booking/new">Edit</a></button>
                        <button className="btn waves-effect waves-light"><a href="/booking/cancel">Cancel</a></button>
                        <button role="link" onClick={handlePayClick} id="checkout-button" className="btn waves-effect waves-light">
                            Proceed to payment
                        </button>
                        {(stripeError !== null) && <p style={errorStyles}>{stripeError}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview
