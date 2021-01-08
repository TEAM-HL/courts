import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import addDays from 'date-fns/addDays'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import getDay from 'date-fns/getDay'
import addMinutes from 'date-fns/addMinutes'
import CurrencyInput from 'react-currency-input-field'
import axios from 'axios'
import { useGlobalState } from "../../config/store"

const CreateBooking = () => {    
    // destructure store and dispatch from global state
    const {store} = useGlobalState()
    // destructure loggedInUser from store
    const {loggedInUser} = store

    // define initial booking values
    const initialBookingValues = {
        duration: "",
        court: "1",
        racquet: 0,
        canister: 0,
        hopper: 0,   
        total: 0
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
    const [date, setDate] = useState(null)

    // calculate total cost
    const calculateTotalCost = (
        prices.duration * values.duration + 
        prices.racquet * values.racquet + 
        prices.canister * values.canister + 
        prices.hopper * values.hopper
    )

    // update state as form input changes 
    const handleInputChange = e => {
        const { name, value } = e.target
        //update values in state
        setValues({
            ...values,
            [name]: value,
        })
    } 

    const handleDurationChange = e => {
        const { value } = e.target
        setValues({
            ...values,
            duration: value
        })

    }
    
    const handleDateChange = date => {
        setDate(date)
        // checkAvailability(date)
    }
    
    const newBooking = async () => {
        await axios({
            method: "POST",
            data: {
                username: "test",
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                end: addMinutes(date, (60*values.duration)).toLocaleTimeString(),
                duration: values.duration,
                court: values.court,
                equipment: {
                    canister: values.canister,
                    racquet: values.racquet,
                    hopper: values.hopper,
                },
                cost: calculateTotalCost
            },
            withCredentials: true, 
            url: "http://localhost:5000/bookings/new"
        }).then(res => {
            console.log(res)
            // if (data passes validation formatting and no prev booking clashes) 
            // redirect user to stripe payment
            // } 
        })
    }

    const checkDate = async (date) => {
        console.log("checking for available times for selected date...")
        try {
            await axios({
                method: "POST",
                data: { date: date.toLocaleDateString() },
                withCredentials: true, 
                url: "http://localhost:5000/bookings/checkDate"
            }).then(res => {
                console.log(res)
            }
            )} catch (error) {
                console.log(error)
            }
    }

    const checkCourt = async () => {
        console.log("checking available courts...")
        try {
            await axios({
                method: "POST",
                data: { 
                    date: date.toLocaleDateString(),
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString(),
                    end: addMinutes(date, (60*values.duration)).toLocaleTimeString(),
                    duration: values.duration        
                },
                withCredentials: true, 
                url: "http://localhost:5000/bookings/checkCourt"
            }).then(res => {
                console.log(res)
            }
            )} catch (error) {
                console.log(error)
            }
    }

    // array of excluded times mon-sat
    const excludedTimes = [
        setHours(setMinutes(new Date(), 0), 0),
        setHours(setMinutes(new Date(), 30), 0),
        setHours(setMinutes(new Date(), 0), 1),
        setHours(setMinutes(new Date(), 30), 1),
        setHours(setMinutes(new Date(), 0), 2),
        setHours(setMinutes(new Date(), 30), 2),
        setHours(setMinutes(new Date(), 0), 3),
        setHours(setMinutes(new Date(), 30), 3),
        setHours(setMinutes(new Date(), 0), 4),
        setHours(setMinutes(new Date(), 30), 4),
        setHours(setMinutes(new Date(), 0), 5),
        setHours(setMinutes(new Date(), 30), 5),
        setHours(setMinutes(new Date(), 0), 6),
        setHours(setMinutes(new Date(), 30), 6),
        setHours(setMinutes(new Date(), 30), 22),
        setHours(setMinutes(new Date(), 0), 23),
        setHours(setMinutes(new Date(), 30), 23),
        setHours(setMinutes(new Date(), 0), 24),
        setHours(setMinutes(new Date(), 30), 24)
      ]
    // array of excluded times sun  
      const excludedTimesSunday = [
          setHours(setMinutes(new Date(), 0), 0),
          setHours(setMinutes(new Date(), 30), 0),
          setHours(setMinutes(new Date(), 0), 1),
          setHours(setMinutes(new Date(), 30), 1),
          setHours(setMinutes(new Date(), 0), 2),
          setHours(setMinutes(new Date(), 30), 2),
          setHours(setMinutes(new Date(), 0), 3),
          setHours(setMinutes(new Date(), 30), 3),
          setHours(setMinutes(new Date(), 0), 4),
          setHours(setMinutes(new Date(), 30), 4),
          setHours(setMinutes(new Date(), 0), 5),
          setHours(setMinutes(new Date(), 30), 5),
          setHours(setMinutes(new Date(), 0), 6),
          setHours(setMinutes(new Date(), 30), 6),
          setHours(setMinutes(new Date(), 30), 19),
          setHours(setMinutes(new Date(), 0), 20),
          setHours(setMinutes(new Date(), 30), 20),
          setHours(setMinutes(new Date(), 0), 21),
          setHours(setMinutes(new Date(), 30), 21),
          setHours(setMinutes(new Date(), 0), 22),
          setHours(setMinutes(new Date(), 30), 22),
          setHours(setMinutes(new Date(), 0), 23),
          setHours(setMinutes(new Date(), 30), 23),
          setHours(setMinutes(new Date(), 0), 24),
          setHours(setMinutes(new Date(), 30), 24)
        ]

    // available times for date picker according to day selected
    const availableTimes = () => {
        const currentDate = new Date()
        // console.log(selectedDate)
        const filterPastTime = ()  => {
            return currentDate.getTime() < date.getTime()
        }
    }

    // form submission
    const handleSubmit = e => {
        e.preventDefault()
        // TESTING
        // console.log(store)
        // console.log(values)
        console.log(`total cost: ${calculateTotalCost}`)
        console.log(`date = ${date}`)
    // ----------------------------------
        newBooking()
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
                        <label>Date & Time</label>
                        <br/>
                        <DatePicker     
                            name="date"
                            selected={date} 
                            value={date}
                            onChange={handleDateChange}
                            dateFormat="MMM d  h:mm aa"
                            placeholderText="Select a date and time"
                            minDate={new Date()}                        
                            maxDate={addDays(new Date(), 10)}
                            excludeTimes={(getDay(date) < 1) ? excludedTimesSunday : excludedTimes}
                            onSelect={checkDate}	
                            showTimeSelect
                            required
                            // filterTime={availableTimes}
                            // dropdownMode="select"
                        />
                        <br/>
                        <label>Duration of play</label>
                        <select required className="browser-default" name="duration" value={values.duration} onChange={handleDurationChange}>
                            <option value="0">Choose option</option>
                            <option value="1">1 Hour</option>
                            <option value="1.5">1.5 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                        <label>Court:</label>
                        <select required className="browser-default" name="court" value={values.court} onChange={handleInputChange} >
                            <option disabled value="0">Choose option</option>
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
                        <CurrencyInput
                            name="total"
                            value={calculateTotalCost}
                            prefix="$"
                            defaultValue={0}
                            decimalsLimit={2}
                            readOnly
                        />
                        <input type="submit" className="btn waves-effect waves-light"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBooking
