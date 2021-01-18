import axios from 'axios'

// create axios instance 
export default axios.create({
    // baseURL: "https://radiant-shore-26863.herokuapp.com",  
    baseURL: "http://localhost:5000",  
    timeout: 5000
})

