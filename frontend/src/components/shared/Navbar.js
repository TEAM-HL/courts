import React, { useEffect } from 'react'
import { Dropdown } from "materialize-css"
import { useGlobalState } from "../../config/store"


const Navbar = () => {
    // destructure store and dispatch from global state
    const {store, dispatch} = useGlobalState()
    
    // destructure loggedInUser from store
    const {loggedInUser} = store
    
    // destructure authenticated from store
    const {authenticated} = store

    useEffect(() => {
        // initialise materialize dropdown element
        let dropdown = document.querySelector('.dropdown-trigger')
        Dropdown.init(dropdown)
    })

    return (
        <div>
            <ul id="bookings-dropdown" className="dropdown-content">
                <li><a href="/booking/new">Book a Court</a></li>
                <li><a href="">View My Bookings</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper blue darken-4">
                    <a href="/" className="brand-logo">Courts</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a className="dropdown-trigger" href="" data-target="bookings-dropdown">Bookings
                            <i className="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Tools</a></li>
                        <li className="red-text text-darken-2">{authenticated === true ? `Welcome, ${loggedInUser && loggedInUser.username}!` : ``}</li>
                        <li>
                            {(authenticated === true)
                                ? <a href="/logout" className="waves-effect waves-light btn grey">Logout<i className="material-icons right">account_circle</i></a>
                                : <a href="/login" className="waves-effect waves-light btn grey">Login<i className="material-icons right">account_circle</i></a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
