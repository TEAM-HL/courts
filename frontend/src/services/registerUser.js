import axios from 'axios'

export const registerUser = (data) => {
    axios({
        method: "POST",
        data: {
            username: data.username,
            email: data.email,
            password: data.password
        },
        withCredentials: true, 
        url: "http://localhost:5000/users/register",
    }).then((res) => console.log(res))
}
