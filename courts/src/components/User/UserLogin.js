import React from 'react'
import { useForm } from 'react-hook-form'
// components 

const UserLogin = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => console.log(data)

    console.log(errors)

    return (
        <div className="container">
            <div className="row">
                <div className="col s6">
                <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Username:</label>
                            <input 
                                type="text" 
                                name="username" 
                                ref={register({ required: true, minLength: 6, maxLength: 15 })} 
                            />
                            {errors.username && errors.username.type === "required" && (
                                <p>This is required.</p>
                            )}
                        <label>Password:</label>
                            <input 
                                type="text" 
                                name="password" 
                                ref={register({ 
                                    required: true, 
                                    minLength: 8, 
                                    maxLength: 10,
                                    pattern: /^[a-zA-Z0-9]$/i 
                                    })} 
                            />
                            {errors.password && (
                                <p>Minimum 8 characters, Maxium 10 characters. Must use lowercase & uppercase letters and at least one number</p>
                            )}
                            <input type="submit" class="btn waves-effect waves-light" /> 
                    </form>    
                </div>
            </div>
        </div>
    )
}

export default UserLogin
