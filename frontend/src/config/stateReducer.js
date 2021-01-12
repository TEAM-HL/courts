export const stateReducer = (state, action) => {
    switch(action.type) {
        case "setLoggedInUser": {
            console.log(action.data)
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setAuthentication": {
            console.log(`authenticated: ${action.data}`)
            return {
                ...state,
                authenticated: action.data
            }
        }
        case "setPendingBooking": {
            console.log('pendingBooking:', action.data)
            return {
                ...state,
                pendingBooking: action.data
            }
        }
        case "RESET_STATE": {
            return {
                ...state,
                loggedInUser: null,
                authenticated: false
            }
        }
        default: 
            return state
    }
}

