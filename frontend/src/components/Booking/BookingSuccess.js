import React from 'react'
import { useGlobalState } from "../../config/store"
import api from '../../config/api'

const BookingSuccess = () => {

    const {store, dispatch} = useGlobalState()

    const { pendingBooking } = store
    console.log("pendingBooking ", pendingBooking)
    
    const testing = async () => {
        await api({
            method: "POST",
            data: pendingBooking,
            url: "/bookings/new"
        }).then(res => {
            // 
        })
    }

    // api({
    //     method: "POST",
    //     data: pendingBooking,
    //     url: "/booking/new"
    // }).then(res => {
    //     if (res.status === 200) {
    //         dispatch({
    //             type: "setPendingBooking",
    //             data: null
    //         })
    //     }
    // })

    return (
        <div className="container">
            <div className="valign-wrapper s12 push-m2 m8">
                <div className="row">
                    <br/>
                    <p>Booking confirmed. Thank you for playing tennis with us!</p>
                    <br/>
                    <p>If you have any questions regarding your court booking, 
                    please email management at <a href="mailto:admin@example.org">admin@example.org</a></p>
                </div>
            </div>
        </div>
    )
}

export default BookingSuccess
