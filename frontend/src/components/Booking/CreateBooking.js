import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateBooking = () => {
    // assign current date to variable
    // const date = new Date(Date.now())
    // convert to local date string
    // const localDate = date.toLocaleDateString('en-GB')
    // define initial booking values
    const initialBookingValues = {
        // date: date,
        // time: "", 
        duration: "",
        court: "",
        racquet: "",
        canister: "",
        hopper: false,            
    }
    // set state for booking detail values 
    const [values, setValues] = useState(initialBookingValues)
    // set state for date
    const [date, setDate] = useState(new Date())
    // set state for time
    const [time, setTime] = useState(0)
    
    // set state variable for total
    const [total, setTotal] = useState(0)
    
    // update state as form input changes 
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    const handleDateChange = date => {
      setDate(date)
    }
    
    // form submission
    const handleSubmit = data => {
        console.log(data)
    }

    // testing 
    console.log(date)
    console.log(values)
    // -------------------------- 
    
    // component structure
    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Book a Court</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Date & Time</label>
                        {/* <input className="datepicker" name="date" type="date" format="dd mm yyyy" value={values.date} onChange={handleInputChange} /> */}
                        <br/>
                        <DatePicker 
                            selected={date} 
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect={true}
                            dateFormat="MMM d yyyy h:mm aa"
                        />
                        {/* <label>Time:</label> */}
                        <br/>
                        <label>Duration of play</label>
                        <select className="browser-default" name="duration" value={values.duration} onChange={handleInputChange}>
                            <option value="0" default>Choose option</option>
                            <option value="1">1 Hour</option>
                            <option value="1.5">1.5 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                        <label>Court:</label>
                        <select className="browser-default" name="court" value={values.court} onChange={handleInputChange} >
                            <option value="0" default>Choose option</option>
                            <option value="1">Court 1</option>
                            <option value="2">Court 2</option>
                            <option value="3">Court 3</option>
                            <option value="4">Court 4</option>
                            <option value="5">Court 5</option>
                            <option value="6">Court 6</option>
                            <option value="7">Court 7</option>
                            <option value="8">Court 8</option>
                        </select>
                        <br />
                        <em>Equipment</em>
                        <br />
                        <br />
                        <label>Racquets:</label>
                        <select className="browser-default" name="racquet" value={values.racquet} onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label>Ball Canisters:</label>
                        <select className="browser-default" name="canister" value={values.canister} onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                        </select>
                        <label>Hopper:</label>
                        <select className="browser-default" name="hopper" value={values.hopper} onChange={handleInputChange} >
                            <option value="false" default>No</option>
                            <option value="true" default>Yes</option>
                        </select>
                        <label>Total Cost:</label>
                        <input name="total" type="number" step="any" min="0.00" />
                        <input type="submit" className="btn waves-effect waves-light"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBooking
