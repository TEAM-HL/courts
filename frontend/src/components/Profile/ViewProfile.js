import React, { useState, useEffect } from 'react'
import axios from '../../config/api'
import M from 'materialize-css'

const UserList = () => {

    // useEffect(() => {
    //     M.AutoInit();
    // })
    
    const EditType = (id) => {
        
    }

    try {
        axios({
        method: "GET",
        withCredentials: true,
        url: "/users"
    }).then(res => {
        console.log(res.data)

        let userlist = res.data.map((x, i) => {
            return(
                `<div>
                    <ul class="collection">
                        <li class="collection-item">Username: ${x.username}</li>
                        <li class="collection-item">Email: ${x.email}</li>
                        <li class="collection-item">User Type: 
                        <div>
                            <select value="${x.userType}">
                                <option value="player">player</option>
                                <option value="coach">coach</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <button onClick={EditType(${x._id})}>Change</button></li>
                    </ul>
                </div>`
            )
        })

        document.getElementsByName("userlist")[0].innerHTML = userlist

    }
        )} catch (error) {
            console.log(error)
    }
    

    return (
        <div>
            <h1>User List</h1>
            <div name="userlist">
                <ul></ul>
            </div>
        </div>
    )
}

export default UserList