import axios from 'axios'

export const loginUser = async (data) => {
    axios({
        method: "POST",
        data: {
            username: data.username,
            password: data.password
        },
        withCredentials: true, 
        url: "http://localhost:5000/users/login",
    }).then((res) => console.log(res))
}
