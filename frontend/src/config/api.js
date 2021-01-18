import axios from 'axios'

// create axios instance 
export default axios.create({
    baseURL: "https://radiant-shore-26863.herokuapp.com", 
    timeout: 5000,
    withCredentials: true
})

