import React, { useEffect } from 'react'
import { Dropdown } from "materialize-css"

const Navbar = () => {
    
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
                        <li><a href="/tools">Tools</a></li>
                        <li><a href="/login" className="waves-effect waves-light btn grey">Login<i className="material-icons right">account_circle</i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
