import React from 'react'
import api from '../../config/api'

const BookingSuccess = () => {

    const pendingBookingData = JSON.parse(localStorage.getItem('pendingBookingData'))
    // console.log(pendingBookingData)

    const saveBooking = async () => {
        await api({
            method: "POST",
            data: pendingBookingData,
            url: "/bookings/new"
        }).then(res => {
            // console.log("response from save booking", res)
            if (res.status === 200) {
                console.log("booking successful!")
            }
        })
    }

    saveBooking()

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
