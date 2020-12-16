import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = () => {

    const [value, onChange] = useState(new Date())

    return (
        <div className="calendarComponentContainer">
            <h2>Calendar</h2>
            <div className="calendarContainer">
                <Calendar
                    onChange={onChange}
                    value={value}
                />
            </div>
            <div className="calendarInfoContainer">
                <h2>Booking Info</h2>
                <div>
                    <ul>
                        <li>Court 1</li>
                        <li>Court 2</li>
                        <li>Court 3</li>
                        <li>Court 4</li>
                        <li>Court 5</li>
                        <li>Court 6</li>
                        <li>Court 7</li>
                        <li>Court 8</li>
                    </ul>
                </div>
            </div>
        </div>
        )

}

export default CalendarComponent