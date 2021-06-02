import * as ACTIONS from '../actions/createGmailTabAction'

const initState = {
    otpChoose: 1,
    otpAPIKEY: "",
    ip: {
        checked: 1,
        value: ""
    },
    passwordDefaultChecked: false,
    password: "softwaremmo.com",
    notSecureChecked: true,
    openImapPOP3Checked: true,
    saveProfileChecked: true,
    deletePhoneChecked: true,
    avatar: {
        checked: false,
        url: ""
    },
    mailRecoverChecked: true
}

export default function reducer(state = {...initState}, action){
    const payload = action.payload;
    switch(action.type){
        case ACTIONS.OTP_SMS_CHOOSE:
            return {
                ...state,
                otpChoose: payload
            }
        case ACTIONS.OTP_SMS_API_KEY:
            return {
                ...state,
                otpAPIKEY: payload
            }
        case ACTIONS.IP_CHOOSE:
                return {
                    ...state,
                    ip: payload,
                }
        case ACTIONS.OPEN_NOT_SECURE:
            return {
                ...state,
                notSecureChecked: payload
            }   
        case ACTIONS.SAVE_PROFILE:
            return {
                ...state,
                saveProfileChecked: !state.saveProfileChecked
            }
        case ACTIONS.OPEN_IMAP_POP3:
            return {
                ...state,
                openImapPOP3Checked: payload
            }   
        case ACTIONS.DELETE_PHONE:
            return {
                ...state,
                deletePhoneChecked: !state.deletePhoneChecked
            } 
        case ACTIONS.PASSWORD_DEFAULT_CHECKED:
            return {
                ...state,
                passwordDefaultChecked: !state.passwordDefaultChecked
            }  
        case ACTIONS.PASSWORD:
            return {
                ...state,
                password: payload
            }
        default:
            return state
    }
    
}