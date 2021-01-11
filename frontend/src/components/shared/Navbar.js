import React, { useEffect } from 'react'
import { Dropdown } from "materialize-css"
import { useHistory } from 'react-router-dom'
import { useGlobalState } from "../../config/store"


const Navbar = () => {
    // use history
    const history = useHistory()

    // destructure store and dispatch from global state
    const {store, dispatch} = useGlobalState()
    
    // destructure loggedInUser from store
    const {loggedInUser} = store
    
    // destructure authenticated from store
    const {authenticated} = store

    // logout user function
    // clear global state
    // redirect to homepage
    const logoutUser = () => {
        dispatch({
            type: "RESET_STATE",
        })
        console.log(store)
        history.push("/login")
    }

    useEffect(() => {
        // initialise materialize dropdown element
        let dropdown = document.querySelector('.dropdown-trigger')
        Dropdown.init(dropdown)
    })

    return (
        <div>
            <ul id="bookings-dropdown" className="dropdown-content">
                <li><a href="/booking/new">Book a Court</a></li>
                <li><a href="/booking/view">View My Bookings</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-4">
                    <a href="/" className="brand-logo">Courts</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a className="dropdown-trigger" data-target="bookings-dropdown">Bookings
                            <i className="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="/community">Community</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/contact">Contact</a></li>
                            {
                                authenticated === true && loggedInUser.type === 'admin' 
                                ? <li><a href="/tools">Tools</a></li>
                                : <li></li>
                            }
                        <li className="red-text text-darken-2">{authenticated === true ? `Welcome, ${loggedInUser && loggedInUser.username}!` : ``}</li>
                        <li>
                            {(authenticated === true)
                                ? <a href="/logout" onClick={logoutUser} className="waves-effect waves-light btn">Logout<i className="material-icons right">account_circle</i></a>
                                : <a href="/login" className="waves-effect waves-light btn">Login<i className="material-icons right">account_circle</i></a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
