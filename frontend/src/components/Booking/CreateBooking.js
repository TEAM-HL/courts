import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import addDays from 'date-fns/addDays'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import addMinutes from 'date-fns/addMinutes'
import getDay from 'date-fns/getDay'
import getTime from 'date-fns/getTime'
import isFuture from 'date-fns/isFuture'
import CurrencyInput from 'react-currency-input-field'
import api from '../../config/api'
import { useGlobalState } from "../../config/store"
import M from 'materialize-css'
import '../../assets/css/App.css'


const CreateBooking = () => {  
    
    // initialise materialize
    useEffect(() => {
        M.AutoInit()
        preFillBooking()
    }, [])
    // setup history const to be used later  
    const history = useHistory()
    // destructure store and dispatch from global state
    const {store, dispatch} = useGlobalState()
    // destructure loggedInUser from store
    const {loggedInUser} = store
    // destructure pendingBooking from store
    const {pendingBooking} = store
    // destructure authenticated from store
    const {authenticated} = store

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
    const [date, setDate] = useState(getRoundedDate(new Date()))
    
    const preFillBooking = () => {
        console.log("pending booking: ", pendingBooking)
        if (pendingBooking !== null) {
            setValues(pendingBooking)
        }
    }

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

    useEffect(() => {
        findCourt()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.duration])
    
    const handleDateChange = date => {
        setDate(date)
        console.log("date changed")
        // console.log(document.getElementsByName("error")[0])
        document.getElementsByName("error")[0].hidden = true
        // console.log(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        // checkDate(date)
    }
    
    //executed when form is submitted
    const newBooking = async () => {
        // assign current booking data to variable
        const bookingData = {
            username: store.loggedInUser,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            end: addMinutes(date, (60*values.duration)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: values.duration,
            court: values.court,
            equipment: {
                canister: values.canister,
                racquet: values.racquet,
                hopper: values.hopper,
            },
            cost: calculateTotalCost
        }
        // dispatch to global store as pendingBooking data
        dispatch({
            type: "setPendingBooking",
            data: bookingData
        })   
        
        // redirect user to checkoutForm component
        history.push("/booking/checkout")
        
        // made backend call to stripe
        // when connection made,redirect user to stripe checkout-form (which includes review of booking details)

        // from within the CheckoutForm component file, 
        // after successful payment is made, save booking in database
        // and provide user with receipt number and tax invoice

    
    }

    const findCourt = async () => {
        console.log("checking available courts...")
        try {
            await api({
                method: "POST",
                data: { 
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    end: addMinutes(date, (60*values.duration)).toLocaleTimeString(),
                    duration: values.duration        
                },
                withCredentials: true, 
                url: "/bookings/findCourt"
            }).then(res => {
                console.log(res.data)
                console.log(document.getElementsByName("court")[0][1])

                // console.log(this.target.value)
                function timeToNumbers(input) {
                    return parseInt(input.split("").filter(x => x !== ":").map((x, i) => {
                        if (x == "3" && i == 2) {
                            return "5"
                        } else {
                            return x
                        }
                    }).join(""))
                }

                let inputTest = "12:30"
                console.log(inputTest)
                inputTest = timeToNumbers(inputTest)
                console.log(inputTest)

                let dateTime = timeToNumbers(date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(12))

                // let dateTime = parseInt(date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }).slice(12).split("").filter(x => x !== ":").map((x, i) => {
                //     if (x == "3" && i == 2) {
                //         return "5"
                //     } else {
                //         return x
                //     }
                // }).join(""))

                let dateEnd = dateTime + (values.duration * 100)

                console.log(values)

                let toNumbers = res.data.map(obj => {
                    obj.time = timeToNumbers(obj.time)
                    // obj.time = parseInt(obj.time.split("").filter(x => x !== ":").map((x, i) => {
                    //     if (x == "3" && i == 2) {
                    //         return "5"
                    //     } else {
                    //         return x
                    //     }
                    // }).join(""))
                    obj.end = timeToNumbers(obj.end)
                    // obj.end = parseInt(obj.end.split("").filter(x => x !== ":").map((x, i) => {
                    //     if (x == "3" && i == 2) {
                    //         return "5"
                    //     } else {
                    //         return x
                    //     }
                    // }).join(""))
                    return obj
                })

                console.log(dateTime)
                console.log(dateEnd)
                console.log(toNumbers)

                let arr1 = toNumbers.filter(obj => obj.end > dateTime)
                let arr2 = arr1.filter(obj => obj.time < dateEnd)

                console.log("Database end time greater than form start time:")
                console.log(arr1)
                console.log("Database Clashing Bookings:")
                console.log(arr2)

                let courtsArray = arr2.map(obj => obj.court)
                courtsArray = courtsArray.filter((value, index) => courtsArray.indexOf(value) === index)
                console.log("Unavailable Courts:")
                console.log(courtsArray)

                if (courtsArray.length == 8) {
                    for (let i = 0; i < 8; i++) {
                        document.getElementsByName("court")[0][i+1].disabled = true
                    }
                    // toNumbers, arr1
                    // needs numerical sorting
                    let nextArray = arr1
                    let nextBookingArr = []
                    let displayTime = ""
                    let ampm = "AM"
                    for (let i = 0; i < 8; i++) {
                        // check for earliest avail and check range for other start dates.
                        nextArray = nextArray.filter(obj => obj.court == (i + 1))
                        nextArray = nextArray.sort((a, b) => {
                            return (a.time > b.time) ? 1 : -1
                        })
                        if (nextArray.length == 1) {
                            nextBookingArr.push(nextArray[0].end)
                        } else {
                            for (let a = 0; a < nextArray.length-1; a++) {
                                if ((nextArray[a+1].time - nextArray[a].end) >= (values.duration * 100)) {
                                    nextBookingArr.push(nextArray[a].end)
                                }
                            }
                            nextBookingArr.push(nextArray[nextArray.length-1].end)
                        }
                        console.log(`Court ${i+1} Bookings:`)
                        console.log(nextArray)
                        nextArray = arr1
                    }
                    nextBookingArr = nextBookingArr.sort((a, b) => {
                        return (a > b) ? 1 : -1
                    })
                    console.log(`next available booking is at ${nextBookingArr[0]}`)
                    displayTime = nextBookingArr[0].toString().split("")
                    // convert error 24h time to 12h
                    if (displayTime[1] > 2 && displayTime[0] == 1) {
                        displayTime[1] = displayTime[1] - 2
                        displayTime[0] = ""
                        ampm = "PM"
                    } else if (displayTime[1] == 2 && displayTime[0] == 1) {
                        ampm = "PM"
                    }
                    // convert error half hour message back to seconds
                    if (displayTime[2] == 5) {
                        displayTime[2] = 3 
                    }
                    // issues with array manipulating methods v is a work around
                    displayTime = `${displayTime[0]}${displayTime[1]}:${displayTime[2]}${displayTime[3]} ${ampm}`
                    console.log(displayTime)
                    document.getElementsByName("error")[0].innerHTML = `next available booking is at ${displayTime}`
                    document.getElementsByName("error")[0].hidden = false
                    console.log(nextBookingArr)

                    console.log("working")
                } else {
                    for (let i = 0; i < 8; i++) {
                        if (!courtsArray.includes(i+1)) {
                            document.getElementsByName("court")[0][i+1].disabled = false
                        } else {
                            document.getElementsByName("court")[0][i+1].disabled = true
                        }
                    }
                }
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
        setHours(setMinutes(new Date(), 0), 22)
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
    
    // get available times for date picker according to day selected
    const availableTimes = () => {
        const currentDate = new Date()
        // console.log(selectedDate)
        const filterPastTime = ()  => {
            return currentDate.getTime() < date.getTime()
        }
    }

    // round date to nearest 30min from current time 
    function getRoundedDate(d=new Date()) {
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
        console.log(`total cost: ${calculateTotalCost}`)
        console.log(`date = ${date}`)
    // ----------------------------------
        newBooking()
    }
    
    
    // component structure
    return (
        <>
        <div className="container">
            <form id="booking-form" className="main-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-heading left-align col s12 push-m2 m8">
                        <h3>Book a Court</h3>
                    </div>
                    <div className="input-field col s12 push-m2 m8">
                        <br/><br/>
                        <DatePicker   
                            name="date"
                            selected={date} 
                            value={date}
                            onChange={handleDateChange}
                            dateFormat="MMM d  h:mm aa"
                            placeholderText="Select a date and time"
                            minDate={new Date()}                        
                            maxDate={addDays(new Date(), 10)}
                            minTime={
                                (getDay(date) === getDay(new Date()) && getDay(date) === 0) ?
                                operatingHoursSunday.filter(time => isFuture(time))[0]
                                : operatingHours[0]
                            }
                            maxTime={
                                (getDay(date) === 0) ? 
                                operatingHoursSunday[operatingHoursSunday.length-1] : 
                                operatingHours[operatingHours.length-1]
                            }
                            excludeTimes={(getDay(date) < 1) ? excludedTimesSunday.filter(time => time > getTime(date)) : excludedTimes.filter(time => time > getTime(date)) }
                            showTimeSelect
                            required
                            withPortal
                            />
                        <label htmlFor="date">Date & Time</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <br/><br/>
                        <select required name="duration" value={values.duration} onChange={handleInputChange}>
                            <option value="0">Choose option</option>
                            <option value="1">1 Hour</option>
                            <option value="1.5">1.5 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                        <label htmlFor="duration">Duration of Play</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <br/><br/>
                        <select required name="court" value={values.court} onChange={handleInputChange} >
                            <option default disabled value="0">Choose option</option>
                            <option value="1">Court 1</option>
                            <option value="2">Court 2</option>
                            <option value="3">Court 3</option>
                            <option value="4">Court 4</option>
                            <option value="5">Court 5</option>
                            <option value="6">Court 6</option>
                            <option value="7">Court 7</option>
                            <option value="8">Court 8</option>
                        </select>
                        <span name="error" hidden="true">error goes here</span>
                        <label htmlFor="court">Court</label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-heading left-align col s12 push-m2 m8">
                        <h6>Equipment</h6>
                    </div>
                    <div className="input-field col s12 push-m2 m8">
                        <label htmlFor="racquet">Racquets</label>
                        <br/><br/>
                        <select name="racquet" value={values.racquet} onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <label htmlFor="canister">Ball Canisters</label>
                        <br/><br/>
                        <select name="canister" value={values.canister} onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <label htmlFor="hopper">Hopper</label>
                        <br/><br/>
                        <select name="hopper" value={values.hopper} onChange={handleInputChange} >
                            <option value="0" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <h6><strong>Total Cost</strong></h6>
                        <br/>
                        <CurrencyInput
                            name="total"
                            value={calculateTotalCost}
                            prefix="$"
                            defaultValue={0}
                            decimalsLimit={2}
                            readOnly
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 push-m2 m8">
                        <input type="submit" className="btn waves-effect waves-light"/>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default CreateBooking
