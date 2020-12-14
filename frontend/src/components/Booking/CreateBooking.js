import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Col } from 'materialize-css';

const CreateBooking = () => {
    const { register, handleSubmit } = useForm()
 
    const onSubmit = data => console.log(data)


    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Create Booking</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Date:</label>
                        <input name="date" type="date" ref={register({ required: true })} />
                        <label>Time:</label>
                        <input name="time" type="time" ref={register({ required: true })} />
                        <label>Duration:</label>
                        <select className="browser-default" name="duration" ref={register({ required: true })} >
                            <option value="" disabled selected>choose option</option>
                            <option value="1">1 Hour</option>
                            <option value="1.5">1.5 Hours</option>
                            <option value="2">2 Hours</option>
                        </select>
                        <label>Court:</label>
                        <select className="browser-default" name="court" ref={register({ required: true })} >
                            <option value="" disabled selected>choose option</option>
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
                        <select className="browser-default" name="racquets" ref={register({})} >
                            <option value="" default>None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label>Ball Canisters:</label>
                        <select className="browser-default" name="canisters" ref={register({})} >
                            <option value="" default>None</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                        </select>
                        <label>Hopper:</label>
                        <select className="browser-default" name="canisters" ref={register({})} >
                            <option value="no" default>No</option>
                            <option value="yes" default>Yes</option>
                        </select>
                        <label>Total Cost:</label>
                        <input name="total" type="number" step="any" min="0.00" ref={register({})} />
                        <input type="submit" className="btn waves-effect waves-light"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBooking
