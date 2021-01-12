import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


// set initial values 
const initialvalues = {
    id: 0,
    username: "",
    email: "",
    password: ""
  }

const UserRegister = () => {
    const history = useHistory()

    const [values, setValues] = useState(initialvalues)

    const handleInputChange = e => {
      const { name, value } = e.target
      setValues({
        ...values,
        [name]: value.trim()
      })
    }
  
    const registerUser = async (data) => {
        await axios({
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
            if (res.data.success === true) {
                history.push("/login")
            } 
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        // console.log(values)
        registerUser(values)
    }

    return (
        <div className="container">
            <div classame="row">
                <div className="col s6">
                    <h1>Register</h1>
                    <form onSubmit={formSubmit}>
                        <label htmlFor="username">
                            Username
                            <input 
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                            />
                        </label>   
                        <label htmlFor="email">
                            Email
                            <input 
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                        </label>   
                        <label htmlFor="password">
                            Password
                            <input 
                                type="text"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <input type="submit" value="submit" className="btn waves-effect waves-light" />   
                    </form>
                    <br/>
                    <span>Already have an account? <strong><a href="/login">Login</a></strong></span>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
