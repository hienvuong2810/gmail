const KEY = "KEY"
const EXPRIED = "EXPRIED"
const STATUS = "STATUS"
const STATE = "STATE"
const PERCENT = "PERCENT"
const NOTI_VERSION = "NOTI_VERSION"
const initState = {
    key: "",
    expired: "",
    version: "1.0.0",
    notiVersion: "Đang bật tool",
    percent: 0,
    state: 0
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
                version: payload
            }
        case STATE:
            return {
                ...state,
                state: payload
            }
        case PERCENT:
            return {
                ...state,
                percent: payload
            }
        case NOTI_VERSION:
            return {
                ...state,
                notiVersion: payload
            }
        default:
            return state
    }
}