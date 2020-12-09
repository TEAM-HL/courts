import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Courts</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="#">Bookings</a></li>
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
