import React from 'react'

const CreateBooking = () => {
    const styles = {
        border: '1px solid blue',
        height: 'auto'
    }
    return (
        <div style={styles}>
            <h1>Create Booking</h1>
            <form>
                <label>
                    Date:
                    <input type="date"/>
                </label>
                <br />
                <label>
                    Time:
                    <input type="time"/>
                </label>
                <br />
                <label>
                    Court:
                    <input/>
                </label>
                <br />
                <h3>Equipment</h3>
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
                    <input type="checkbox"/>
                </label>
                <br />
                <label>
                    Total Cost:
                    <input type="number" step="any"/>
                </label>
            </form>
        </div>
    )
}

export default CreateBooking
