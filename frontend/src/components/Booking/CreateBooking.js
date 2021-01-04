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
        racquet: 0,
        canister: 0,
        hopper: 0,            
    }

    const initialCost = {
        duration: 0,
        racquet: 0,
        canister: 0,
        hopper: 0   
    }

    const prices = {
        duration: 25,
        racquet: 10,
        canister: 5,
        hopper: 10
    }

    // set state for booking detail values 
    const [values, setValues] = useState(initialBookingValues)
    // set state for date
    const [date, setDate] = useState(new Date())
    // set state for time
    const [time, setTime] = useState(0)
    // set state variable for total
    const [total, setTotal] = useState(initialCost)
    
    // calculate total cost
    const calculateTotalCost = 
    (prices.duration * values.duration + 
    prices.racquet * values.racquet + 
    prices.canister * values.canister + 
    prices.hopper * values.hopper)

    // update state as form input changes 
    const handleInputChange = e => {
        const { name, value } = e.target
        //update each value
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleDateChange = date => {
        setDate(date)
    }
    
    // form submission
    const handleSubmit = e => {
        e.preventDefault()
        console.log(total)
        console.log(calculateTotalCost)
    }
    
    // ------TESTING-------------
    // console.log(date)
    // console.log(values)
    // console.log(total)
    // -------------------------- 
    
    // component structure
    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Book a Court</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Date  &  Time</label>
                        <br/>
                        <DatePicker 
                            selected={date} 
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect={true}
                            dateFormat="MMM d   h:mm aa"
                        />
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
                            <option value="0" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label>Total:</label>
                        <input name="total" type="number" step="any" min="0.00" value={calculateTotalCost}/>
                        <input type="submit" className="btn waves-effect waves-light"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBooking
