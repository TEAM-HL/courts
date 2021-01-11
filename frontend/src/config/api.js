import axios from 'axios'

// create axios instance 
export default axios.create({
    baseURL: "http://localhost:3000", //change this to deployment server when ready
    timeout: 5000
})

