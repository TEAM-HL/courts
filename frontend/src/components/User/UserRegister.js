import React from 'react'

const UserRegister = () => {
    return (
        <div className="container">
            <div classame="row">
                <div className="col s6">
                    <h1>Register</h1>
                    <form action="submit">
                        <label htmlFor="username">
                            Username
                            <input type="text"/>
                        </label>   
                        <label htmlFor="email">
                            Email
                            <input type="text"/>
                        </label>   
                        <label htmlFor="password">
                            Password
                            <input type="text"/>
                        </label>   
                    </form>
                    <br/>
                    <span>Already have an account? <strong><a href="/login">Login</a></strong></span>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
