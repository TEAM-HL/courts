import React from 'react'
import axios from '../../config/api'
import { useGlobalState } from "../../config/store"

const ViewBookings = () => {

    try {
        axios({
        method: "GET",
        withCredentials: true,
        url: "/bookings/"
    }).then(res => {
        let testingUser = "test"

        let configure = res.data.filter(obj => obj.username == testingUser)
        console.log(configure)

        configure = configure.map((x, i) => {
            return(
            `<ul class="collection">
                <li class="collection-item">Booked by: ${x.username}</li>
                <li class="collection-item">Date: ${x.date}, Time: ${x.time}</li>
                <li class="collection-item">Canisters: ${x.equipment.canister}, Racquets: ${x.equipment.racquet}, Hoppers: ${x.equipment.hopper}</li>
                <li class="collection-item">Court: ${x.court}</li>
                <li class="collection-item">Cost: $${x.cost}</li>
                <button onClick={}>Edit</button><button onClick={}>Refund</button>
            </ul>`
            )
        })

        document.getElementsByName("user")[0].innerHTML = testingUser
        document.getElementsByName("bookings")[0].innerHTML = configure
    }
        )} catch (error) {
            console.log(error)
    }

    return (
        <div>
            <h1 name="user"> </h1>
            <div name="bookings">
                <ul></ul>
            </div>
        </div>
    )
}

export default ViewBookings