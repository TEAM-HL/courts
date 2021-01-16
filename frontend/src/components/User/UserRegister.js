import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../config/api'
import M from 'materialize-css'

// set initial values local state
const initialvalues = {
    id: 0,
    username: "",
    email: "",
    password: ""
  }

const UserRegister = () => {
    // initialise materialize
    M.AutoInit()
    //define history for use later
    const history = useHistory()
    // set local state for errorMessage 
    const [errorMessage, setErrorMessage] = useState(null)
    // set local state for form values
    const [values, setValues] = useState(initialvalues)

    // update values object when input changes
    const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value.trim()
      })
    }
    // register user function to call server
    const registerUser = async (data) => {
        await api({
            method: "POST",
            data: {
                username: data.username,
                email: data.email,
                password: data.password
            },
            withCredentials: true, 
            url: "/users/register",
        }).then(res => {
            console.log(res)
            if (res.data.success === false) {
                setErrorMessage(res.data.message)
            }
            else if (res.data.success === true) {
                history.push("/login")
            } 
        })
    }

    // error message css styles
    const errorStyles = {
    color: "red"
    }

    const formSubmit = (e) => {
        e.preventDefault()
        // console.log(values)
        registerUser(values)
    }

    return (
        <div className="container">
            <div classame="row">
                <h3>Register</h3>
                <form onSubmit={formSubmit}>
                    <div className="row">
                        <div className="input-field col s10 m6">
                            <label for="username">Username</label>   
                            <input 
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10 m6">
                            <label for="email">Email</label> 
                            <input type="text"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s10 m6">
                            <label for="password">Password</label>
                                <input 
                                    type="text"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInputChange}
                                />
                        </div>
                    </div>
                    <input type="submit" value="submit" className="btn waves-effect waves-light" />  
                    {errorMessage && <p style={errorStyles}>{errorMessage}</p>} 
                </form>
                <p>Already have an account? <strong><a href="/login">Login</a></strong></p>
            </div>
        </div>
    )
}

export default UserRegister
