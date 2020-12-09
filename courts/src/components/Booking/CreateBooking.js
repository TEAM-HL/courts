import React from 'react'

import ButtonGroup from '../shared/ButtonGroup'

const CreateBooking = () => {
  
    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <h1>Create Booking</h1>
                    <form>
                        <label>
                            Date:
                            <input className="validate" type="date"/>
                        </label>
                        <br />
                            <label>
                                Time:
                                <input type="time"/>
                            </label>
                        <br />
                            <label>
                                Court:
                                <input type="number" min="1" max="8"/>
                            </label>
                        <br />
                        <h5>Equipment</h5>
                        <label>
                            Racquets:
                            <input type="number" placeholder="0" min="0" max="4"/>
                        </label>
                        <br />
                        <label>
                            Canisters:
                            <input type="number" placeholder="0" max="4" min="0"/>
                        </label>
                        <br />
                        <label>
                            Hopper:
                            <input type="checkbox" />
                        </label>
                        <br />
                        <label>
                            Total Cost:
                            <input type="number" step="any"/>
                        </label>
                    </form>
                </div>
            </div>
            <ButtonGroup />
        </div>
    )
}

export default CreateBooking
