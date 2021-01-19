import axios from 'axios'

// create axios instance 
export default axios.create({
    baseURL: "https://polar-river-03280.herokuapp.com", 
    timeout: 5000,
    withCredentials: true
})

