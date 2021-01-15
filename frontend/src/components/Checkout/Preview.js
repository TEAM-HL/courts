import React from 'react'
import { useGlobalState } from "../../config/store"

const Preview = () => {
    // destructure store and dispatch from globalstate 
    const {store, dispatch} = useGlobalState()

    // const previewBookingData = store.pendingBooking
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

    // console.log("preview booking data:", previewBookingData)
    const pairs = Object.entries(testData)
    console.log("entries", pairs)
    // create empty object
    const previewData = []
    // iterate over nested pairs object and push to previewData 
    pairs.map(entry => {
            if (typeof entry[1] ==='object') {
                let nestedObj = Object.entries(entry[1])
                // nestedObj.map(entry => console.log(`${entry[0]}: ${entry[1]}`) )
                nestedObj.map(entry => previewData.push(entry) )
            } else previewData.push(entry)
        })
    console.log("post", previewData)
    const log = previewData.forEach((array, index) => {
        if (array[0] === "court") {
            console.log(array[0])
            return array.indexOf('court')
        } 
    })

    console.log(log)

    function getValueOf(array, item) {
        const index = array.forEach((array, index) => {
            if (array[0] === item) {
                return index
            } 
        })
        console.log(index)
        return array[index][1]
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
                        previewData ?
                        (
                            pairs.map(entry => {
                            if (typeof entry[1] ==='object') {
                                let nestedObj = Object.entries(entry[1])
                                nestedObj.map(entry => {
                                    <li class="collection-item" key={entry[0]}>{entry[0]}: {entry[1]}</li>
                                })
                            } else {
                                return (<li class="collection-item" key={entry[0]}>{entry[0]}: {entry[1]}</li>)
                                }
                            })
                        )
                        : <p></p>
                        }
                    </ul>
                    <div className="row">
                        <button className="btn waves-effect waves-light">Cancel</button>
                        <button role="link" id="checkout-button" className="btn waves-effect waves-light">
                            Proceed to payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview

{/* <p>You have booked court {getValueOf(previewData, 'court')}</p> */}

