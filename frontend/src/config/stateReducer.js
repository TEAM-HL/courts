export const stateReducer = (state, action) => {
    switch(action.type) {
        case "setLoggedInUser": {
            console.log("loggedInUser:", action.data)
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setAuthentication": {
            console.log("authenticated", action.data)
            return {
                ...state,
                authenticated: action.data
            }
        }
        case "setPendingBooking": {
            console.log('State Reducer pendingBooking:', action.data)
            return {
                ...state,
                pendingBooking: action.data
            }
        }
        case "RESET_STATE": {
            console.log("Reset State")
            return {
                ...state,
                loggedInUser: null,
                authenticated: false,
                pendingBooking: null
            }
        }
        default: 
            return state
    }
}

