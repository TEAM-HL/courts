import axios from 'axios'

// create axios instance 
export default axios.create({
    // baseURL: "https://polar-river-03280.herokuapp.com", 
    baseURL: "http://localhost:5000", 
    timeout: 5000,
    withCredentials: true
})

