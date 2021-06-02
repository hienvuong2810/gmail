import {INCRESE_REGISTER_SUCCESS, INCRESE_REGISTER_FAIL, START, STOP, THREADS} from '../actions/footerAction.js'

const initState = {
    registerSuccess: 0,
    registerFail: 0,
    buttonStartEnable: true,
    buttonPauseEnable: false,
    threads: 1
}
export default function reducer(state = {...initState}, action){
    const payload = action.payload;

    switch(action.type){
        case INCRESE_REGISTER_SUCCESS:
            return {
                ...state,  
                registerSuccess: state.registerSuccess + 1
            }
        case INCRESE_REGISTER_FAIL:
            return {
                ...state,
                registerFail: state.registerFail + 1
            }
        case START:
            return {
                ...state,
                buttonStartEnable: false,
                buttonPauseEnable: true
            }
        case STOP:
            return{
                ...state,
                buttonStartEnable: true,
                buttonPauseEnable: false  
            }
        case THREADS:
            return {
                ...state,
                threads: payload
            }
        default:
            return state
    }
}