const KEY = "KEY"
const EXPRIED = "EXPRIED"
const STATUS = "STATUS"

const initState = {
    key: "",
    expired: "",
    status: "TRIAL"
}

export default function reducer(state = {...initState}, action){
    const payload = action.payload

    switch (action.type){
        case KEY:
            return {
                ...state,
                key: payload
            }
        case EXPRIED:
            return {
                ...state,
                expired: payload
            }
        case STATUS:
            return {
                ...state,
                status: payload
            }
        default:
            return state
    }
}