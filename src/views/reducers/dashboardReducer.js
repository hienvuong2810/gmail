import * as ACTIONS from '../actions/dashboardTabAction'

const initState = {
    listMail: []
}

export default function reducer(state = {...initState}, action){
    const payload = action.payload

    switch (action.type){
        case ACTIONS.UPDATE_LIST:
            return {
                ...state,
                listMail: payload
            }
        default:
            return state
    }
}