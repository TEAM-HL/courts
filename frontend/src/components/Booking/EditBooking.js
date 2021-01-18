import React from 'react'
import axios from '../../config/api'
import { useGlobalState } from "../../config/store"

const EditBooking = () => {

    try {
        axios({
        method: "POST",
        data: {},
        withCredentials: true,
        url: "/bookings/update/:id"
    }).then(res => {
        console.log("working")
    }
        )} catch (error) {
            console.log(error)
    }


    return (
        <div>
            <h1></h1>
        </div>
    )
}

export default EditBooking