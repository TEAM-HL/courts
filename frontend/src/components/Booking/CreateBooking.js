import React, { useState, useEffect } from 'react'



const CreateBooking = () => {

    // assign current date to variable
    const date = new Date(Date.now())
    // convert to local date string
    const localDate = date.toLocaleDateString('en-GB')


    const initialBookingValues = {
        date: localDate,
        time: null, 
        duration: null,
        court: null,
        racquet: null,
        canister: null,
        hopper: null,            
    }

    // set state variables 
    const [values, setValues] = useState(initialBookingValues)

    // set state variable for total
    const [total, setTotal] = useState(0)

    // update state as form input changes 
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        console.log(values)
    }
    
    // form submission
    const handleSubmit = data => console.log(data)


    // component structure
    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Create Booking</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Date:</label>
                        <input name="date" type="date" onChange={handleInputChange} />
                        <label>Time:</label>
                        <input name="time" type="time" onChange={handleInputChange} />
                        <label>Duration:</label>
                        <select className="browser-default" name="duration" value={values.duration} onChange={handleInputChange}>
                            <option value="" default>Choose option</option>
                            <option value="1">1 Hour</option>
                            <option value="1.5">1.5 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                        <label>Court:</label>
                        <select className="browser-default" name="court" onChange={handleInputChange} >
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
                        <select className="browser-default" name="racquet" onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label>Ball Canisters:</label>
                        <select className="browser-default" name="canister" onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                        </select>
                        <label>Hopper:</label>
                        <select className="browser-default" name="hopper" onChange={handleInputChange} >
                            <option value="no" default>No</option>
                            <option value="yes" default>Yes</option>
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
