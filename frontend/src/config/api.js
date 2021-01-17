import axios from 'axios'

// create axios instance 
export default axios.create({
    baseURL: "http://localhost:5000",  //change this to heroku deployment server when at production stage
    timeout: 5000
})