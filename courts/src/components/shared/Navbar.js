import React, { useEffect } from 'react'
import { Dropdown } from "materialize-css"


const Navbar = () => {
    
    useEffect(() => {
        // initialise dropdown 
        let dropdown = document.querySelector('.dropdown-trigger')
        Dropdown.init(dropdown)
    })

    return (
        <div>
            <ul id="bookings-dropdown" className="dropdown-content">
                <li><a href="#">Book a Court</a></li>
                <li><a href="#">View My Bookings</a></li>
            </ul>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Courts</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a class="dropdown-trigger" href="#" data-target="bookings-dropdown">Bookings
                            <i class="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Tools</a></li>
                        <li><a class="waves-effect waves-light btn">Login <i class="material-icons right">account_circle</i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
