import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from "../../config/store"
//materialize
import 'materialize-css';
import M from 'materialize-css/dist/js/materialize.min.js'
import api from '../../config/api'


const NavbarHeader = () => {
    // define history for use later
    const history = useHistory()

    // destructure store and dispatch from global state
    const {store, dispatch} = useGlobalState()
    // destructure loggedInUser from store
    const {loggedInUser} = store
    // destructure authenticated from store
    const {authenticated} = store

    useEffect(() => {
        //initialise sidenave
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {})    

        //initialise dropdowns from sidenav and navbar
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
        // console.log(dropdowns)
        M.Dropdown.init(dropdowns[0], {})
        M.Dropdown.init(dropdowns[1], {})
    })

    // logout user function
    // clear global state
    // redirect to homepage
    const logoutUser = async () => {
         // call logout on express server to delete session cookie 
         await api({
            method: "GET",
            url: "/users/logout"
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                // clear global context
                dispatch({
                    type: "RESET_STATE",
                })
                //redirect user
                history.push("/")
                console.log(store)
            } 
        })
    }


    return (
        <div>
            <nav>
                <div className="nav-wrapper blue darken-4">
                    <a href="" data-target="slide-out" className="sidenav-trigger hide-on-large-only"><i className="material-icons">menu</i></a>
                    <a href="/" id="courts-logo" className="brand-logo">Courts</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className="yellow-text text-darken-2">{authenticated === true ? `Welcome, ${loggedInUser.username}` : ''}</li>
                        {/* <li><a className="dropdown-trigger" data-target="bookings-dropdown">Bookings
                            <i className="material-icons right">arrow_drop_down</i></a>
                        </li> */}
                        <li className=" blue darken-1"><a href="/booking/new">Book a Court</a></li>
                        <li><a href="/booking/view">View My Bookings</a></li>
                        <li><a href="/community">Community</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/contact">Contact</a></li>
                            {
                                authenticated === true && loggedInUser.userType === 'admin' 
                                ? <li><a href="/tools">Tools</a></li>
                                : <li></li>
                            }
                        <li>
                            {(authenticated === true)
                                ? <a href="/logout" onClick={logoutUser} className="waves-effect waves-light btn">Logout<i className="material-icons right">account_circle</i></a>
                                : <a href="/login" className="waves-effect waves-light btn">Login<i className="material-icons right">account_circle</i></a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
            <ul id="bookings-dropdown" className="dropdown-content">
                <li><a href="/booking/new">Book a Court</a></li>
                <li><a href="/booking/view">View My Bookings</a></li>
            </ul>
            <ul id="slide-out" className="sidenav">
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
                <li>
                    {(authenticated === true)
                        ? <a href="/logout" onClick={logoutUser} className="waves-effect waves-light">Logout<i className="material-icons left">account_circle</i></a>
                        : <a href="/login" className="waves-effect waves-light">Login<i className="material-icons left">account_circle</i></a>
                    }
                </li>
            </ul>
        </div> 
    )
}

export default NavbarHeader
