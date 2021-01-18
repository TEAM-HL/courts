import axios from 'axios'

// create axios instance 
export default axios.create({
    // https://radiant-shore-26863.herokuapp.com/
    baseURL: "https://radiant-shore-26863.herokuapp.com",  //change this to deployment server when at production stage
    timeout: 5000
})

