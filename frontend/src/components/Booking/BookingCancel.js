import React from 'react'

const BookingCancel = () => {
    return (
        <div className="container">
            <div className="valign-wrapper s12 push-m2 m8">
                <div className="row">
                    <br/>
                    <p>Your booking has been cancelled. Please click <a href="/booking/new">here </a>to create a new booking.</p>
                    <br/>
                    <p>If you require any assistance with the booking process, 
                    please email management at <a href="mailto:admin@example.org">admin@example.org</a></p>
                </div>
            </div>
        </div>
    )
}

export default BookingCancel
