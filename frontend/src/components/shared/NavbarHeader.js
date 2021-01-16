import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from "../../config/store"
//materialize
import 'materialize-css';
import { Navbar, Icon, Dropdown, NavItem, Button } from 'react-materialize'


const NavbarHeader = () => {
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

    // useEffect(() => {
    //     // initialise materialize dropdown element
    //     let dropdown = document.querySelector('.dropdown-trigger')
    //     Dropdown.init(dropdown)
    // })

    return (
        <Navbar
            className="blue darken-3"
            alignLinks="right" 
            brand={<a id="courts-logo" className="brand-logo" href="/" style={{marginLeft:"0.5em"}}>Courts</a>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}>
            <Dropdown
                id="Dropdown_6"
                options={{
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
                }}
                trigger={<a>Bookings{' '}<Icon right>arrow_drop_down</Icon></a>}
            >
                <a href="/booking/new">
                Book A Court
                </a>
                <a href="/booking/all">
                View Bookings
                </a>
            </Dropdown>
                <NavItem href="/community">
                Community
            </NavItem>
            <NavItem href="/events">
                Events
            </NavItem>
            <NavItem href="/contact">
                Contact
            </NavItem>
            <NavItem href="/admin/tools">
                Admin
            </NavItem>
            {
                (authenticated === true) ?
                <Button
                    node="button"
                    waves="light"
                    onClick={logoutUser}
                    style={{
                        marginRight: '1em'
                    }}
                >
                    Logout
                </Button>
                :
                <NavItem href="/login">
                    <Button
                        node="button"
                        waves="light"
                        style={{
                            marginRight: '1em'
                        }}
                        href="/login"
                    >
                        Login
                    </Button>
                </NavItem>
            }
        </Navbar>
    )
}

export default NavbarHeader
