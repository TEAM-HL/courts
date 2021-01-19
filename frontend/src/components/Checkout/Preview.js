import React, { useState } from 'react'
import { useGlobalState } from "../../config/store"
import {loadStripe} from '@stripe/stripe-js';
import api from '../../config/api'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_thG1zqeSc5ZWjKDe6OENpRPe00rgTugo8l');

const Preview = () => {
    // destructure store and dispatch from globalstate 
    const {store, dispatch} = useGlobalState()

    const { pendingBooking } = store
    console.log("pendingBooking ", pendingBooking)
    const [stripeError, setStripeError] = useState(null)

    const testData = {
        username: "coolUser",
        date: "16/01/2021",
        time: "10:30",
        end: "11:30",
        duration: 1,
        court: 5,
        equipment: {
            canister: 0,
            racquet: 0,
            hopper: 0,
        },
        cost: 25.00
    }

    const previewBookingData = pendingBooking
    // const previewBookingData = testData

    console.log("preview booking data:", previewBookingData)
    const pairs = Object.entries(previewBookingData)
    // console.log("entries", pairs)
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



    // const log = previewData.forEach((array, index) => {
    //     if (array[0] === "court") {
    //         console.log(array[0])
    //         return array.indexOf('court')
    //     } 
    // })

    // console.log(log)

    // function getValueOf(array, item) {
    //     const index = array.forEach((array, index) => {
    //         if (array[0] === item) {
    //             return index
    //         } 
    //     })
    //     console.log(index)
    //     return array[index][1]
    // }

    const handlePayClick = async () => {
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
            sessionId: session.data.id,
        })
        if (result.error) {
            console.log(result.error.message)
            setStripeError(result.error.message)
        // } else {
        //     await api({
        //         method: "POST",
        //         data: pendingBooking,
        //         url: "/booking/new"
        //     }).then(res => {
        //         if (res.status === 200) {
        //             dispatch({
        //                 type: "setPendingBooking",
        //                 data: null
        //             })
        //         }

        //     })
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
                        <button className="btn waves-effect waves-light">Edit</button>
                        <button className="btn waves-effect waves-light">Cancel</button>
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


// pairs.map(entry => {
//     if (typeof entry[1] ==='object') {
//         let nestedObj = Object.entries(entry[1])
//         nestedObj.map(entry => {
//             <li className="collection-item" key={entry[0]}>{entry[0]}: {entry[1]}</li>
//         })
//     } else {
//         return (<li className="collection-item" key={entry[0]}>{entry[0]}: {entry[1]}</li>)
//         }
//     })