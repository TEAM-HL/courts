import axios from 'axios'

// create axios instance 
const axiosBaseURL = axios.create({
    baseURL: "http://localhost:3000",  //change this to deployment server when at production stage
    timeout: 5000
})

export default axiosBaseURL