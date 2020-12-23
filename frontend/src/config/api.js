import axios from 'axios'

// create axios instance 
export default axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
})