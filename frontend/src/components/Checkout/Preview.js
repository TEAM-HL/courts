import React from 'react'
import { useGlobalState } from "../../config/store"

const Preview = () => {
    // destructure store and dispatch from globalstate 
    const {store, dispatch} = useGlobalState()

    const previewBookingData = store.pendingBooking

    console.log("preview booking data", previewBookingData)

    return (
        <div>
        {/* iterate of the previewBookingData to create a preview list or table etc of the booking  */}
            <ul>{previewBookingData.map(name => <li key={name}> {name} </li>)}</ul>
        </div>
    )
}

export default Preview
