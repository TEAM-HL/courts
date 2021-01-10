import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import addDays from 'date-fns/addDays'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import getDay from 'date-fns/getDay'
import getTime from 'date-fns/getTime'
import closestTo from 'date-fns/closestTo'
import isFuture from 'date-fns/isFuture'
import toDate from 'date-fns/toDate'
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
        findCourt()
    }
    
    const handleDateChange = date => {
        setDate(date)
        console.log("date changed")
        // console.log(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        // checkDate(date)
    }
    
    const newBooking = async () => {
        await axios({
            method: "POST",
            data: {
                username: "test",
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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

    // function to return all values of a certain key -
    // used below to return array of unavailable times
    function findAllByKey(object, keyToFind) {
        return Object.entries(object)
          .reduce((acc, [key, value]) => (key === keyToFind)
            ? acc.concat(value)
            : (typeof value === 'object')
            ? acc.concat(findAllByKey(value, keyToFind))
            : acc
          , [])
      }

    const checkDate = async (date) => {
        console.log("checking for available times for selected date...")
        try {
            await axios({
                method: "POST",
                data: { 
                    date: date.toLocaleDateString(), 
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })    
                },
                withCredentials: true, 
                url: "http://localhost:5000/bookings/checkDate"
            }).then(res => {
                console.log(res)
                console.log("second array starts here")
                const data = res.data.data
                console.log(data)
                // add data to localState
                console.log(data.filter(court => court.court === 3))
                
                // if (res.data.success === true && getDay(date) < 1) {
                // }

                // for filtering duration
                // array.filter(remove entries that are earlier than current booking)
                //  .filter(end <= start)


                }
                )} catch (error) {
                    console.log(error)
                }
    }

    const findCourt = async () => {
        console.log("checking available courts...")
        try {
            await axios({
                method: "POST",
                data: { 
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    end: addMinutes(date, (60*values.duration)).toLocaleTimeString(),
                    duration: values.duration        
                },
                withCredentials: true, 
                url: "http://localhost:5000/bookings/findCourt"
            }).then(res => {
                console.log(res.data)

                let dateTime = parseInt(date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(12).split("").filter(x => x !== ":").map((x, i) => {
                    if (x == "3" && i == 2) {
                        return "5"
                    } else {
                        return x
                    }
                }).join(""))

                let dateEnd = dateTime + 200

                console.log(values)

                let toNumbers = res.data.map(obj => {
                    obj.time = parseInt(obj.time.split("").filter(x => x !== ":").map((x, i) => {
                        if (x == "3" && i == 2) {
                            return "5"
                        } else {
                            return x
                        }
                    }).join(""))
                    obj.end = parseInt(obj.end.split("").filter(x => x !== ":").map((x, i) => {
                        if (x == "3" && i == 2) {
                            return "5"
                        } else {
                            return x
                        }
                    }).join(""))
                    return obj
                })

                console.log(dateTime)
                console.log(dateEnd)
                console.log(toNumbers)

                let arr1 = toNumbers.filter(obj => obj.end >= dateTime)
                let arr2 = arr1.filter(obj => obj.time <= dateEnd)

                console.log(arr1)
                console.log(arr2)

                let courtsArray = arr2.map(obj => obj.court)
                console.log(courtsArray)

                // parseInt(startString.split("")
                //     .map((char, index) => {
                //     if (char === '3' && index === startString.length-2) {
                //         return '5'
                //     } else {return char}
                // })
                //     .filter(char => char !== ':')
                //     .join(""))
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
    // array of operatingHours mon-sat
    const operatingHours = [
        setHours(setMinutes(new Date(), 0), 7),
        setHours(setMinutes(new Date(), 30), 7),
        setHours(setMinutes(new Date(), 0), 8),
        setHours(setMinutes(new Date(), 30), 8),
        setHours(setMinutes(new Date(), 0), 9),
        setHours(setMinutes(new Date(), 30), 9),
        setHours(setMinutes(new Date(), 0), 10),
        setHours(setMinutes(new Date(), 30), 10),
        setHours(setMinutes(new Date(), 0), 11),
        setHours(setMinutes(new Date(), 30), 11),
        setHours(setMinutes(new Date(), 0), 12),
        setHours(setMinutes(new Date(), 30), 12),
        setHours(setMinutes(new Date(), 0), 13),
        setHours(setMinutes(new Date(), 30), 13),
        setHours(setMinutes(new Date(), 0), 14),
        setHours(setMinutes(new Date(), 30), 14),
        setHours(setMinutes(new Date(), 0), 15),
        setHours(setMinutes(new Date(), 30), 15),
        setHours(setMinutes(new Date(), 0), 16),
        setHours(setMinutes(new Date(), 30), 16),
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 30), 17),
        setHours(setMinutes(new Date(), 0), 18),
        setHours(setMinutes(new Date(), 30), 18),
        setHours(setMinutes(new Date(), 0), 19),
        setHours(setMinutes(new Date(), 30), 19),
        setHours(setMinutes(new Date(), 0), 20),
        setHours(setMinutes(new Date(), 30), 20),
        setHours(setMinutes(new Date(), 0), 21),
        setHours(setMinutes(new Date(), 30), 21),
        setHours(setMinutes(new Date(), 0), 22),
        setHours(setMinutes(new Date(), 30), 22)
      ]
    // array of excluded times sun  
      const operatingHoursSunday = [
          setHours(setMinutes(new Date(), 0), 7),
          setHours(setMinutes(new Date(), 30), 7),
          setHours(setMinutes(new Date(), 0), 8),
          setHours(setMinutes(new Date(), 30), 8),
          setHours(setMinutes(new Date(), 0), 9),
          setHours(setMinutes(new Date(), 30), 9),
          setHours(setMinutes(new Date(), 0), 10),
          setHours(setMinutes(new Date(), 30), 10),
          setHours(setMinutes(new Date(), 0), 11),
          setHours(setMinutes(new Date(), 30), 11),
          setHours(setMinutes(new Date(), 0), 12),
          setHours(setMinutes(new Date(), 30), 12),
          setHours(setMinutes(new Date(), 0), 13),
          setHours(setMinutes(new Date(), 30), 13),
          setHours(setMinutes(new Date(), 0), 14),
          setHours(setMinutes(new Date(), 30), 14),
          setHours(setMinutes(new Date(), 0), 15),
          setHours(setMinutes(new Date(), 30), 15),
          setHours(setMinutes(new Date(), 0), 16),
          setHours(setMinutes(new Date(), 30), 16),
          setHours(setMinutes(new Date(), 0), 17),
          setHours(setMinutes(new Date(), 30), 17),
          setHours(setMinutes(new Date(), 0), 18),
          setHours(setMinutes(new Date(), 30), 18),
          setHours(setMinutes(new Date(), 0), 19),
          setHours(setMinutes(new Date(), 30), 19)
        ]
    // -----TESTING ------------------
    // const times = operatingHours.map(time => toDate(time)).filter(time => isFuture(time))
    // const timesAfterNow = operatingHours.filter(time => isFuture(time))
    // console.log(timesAfterNow)    
    // ------------------------------------
    
    // get available times for date picker according to day selected
    const availableTimes = () => {
        const currentDate = new Date()
        // console.log(selectedDate)
        const filterPastTime = ()  => {
            return currentDate.getTime() < date.getTime()
        }
    }

    const getRoundedDate = (d=new Date()) => {
        console.log("hit rounded date func")
        // convert minutes to ms
        const ms = 1000 * 60 * 30
        // round date to nearest supplied ms value
        const roundedDate = new Date(Math.ceil(d.getTime() / ms) * ms)
        console.log(roundedDate)
        const m = roundedDate.getMinutes()
        const h = roundedDate.getHours()
        return (setHours(setMinutes(new Date(), m), h))
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
                            // minTime={ 
                            //     getDay(date) === getDay(new Date()) && getDay(date) < 1 ? 
                            //     operatingHoursSunday.filter(time => isFuture(time))[0] :
                            //     operatingHours.filter(time => isFuture(time))[0]
                            //     }
                            // maxTime={
                            //     (getDay(date) < 1) ? 
                            //     operatingHoursSunday[operatingHoursSunday.length-1] : 
                            //     operatingHours[operatingHours.length-1]
                            // }
                            // excludeTimes={(getDay(date) < 1) ? excludedTimesSunday.filter(time => time > getTime(date)) : excludedTimes.filter(time => time > getTime(date))}
                            showTimeSelect
                            required
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
