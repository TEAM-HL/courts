import React from 'react'
import { useGlobalState } from "../../config/store"

const Preview = () => {
    // destructure store and dispatch from globalstate 
    const {store, dispatch} = useGlobalState()

    // const previewBookingData = store.pendingBooking
    const previewBookingData = {
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
    const pairs = Object.entries(previewBookingData)
    console.log("entries", pairs)
    const preview = 
        pairs.map(entry => {
            if (typeof entry[1] ==='object') {
                let nestedObj = Object.entries(entry[1])
                nestedObj.map(entry => console.log(`${entry[0]}: ${entry[1]}`) )
            } else console.log(`${entry[0]}: ${entry[1]}`)
        })

    return (
        <div>
        <h4>Please review your booking</h4>
            <ul>
                {
                    pairs.map(entry => {
                        if (typeof entry[1] ==='object') {
                            let nestedObj = Object.entries(entry[1])
                            nestedObj.map(entry => <li key={entry[0]}>{entry[0]}: {entry[1]}</li>)
                        } else {
                            return (<li key={entry[0]}>{entry[0]}: {entry[1]}</li>)
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default Preview


