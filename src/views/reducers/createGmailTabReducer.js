import * as ACTIONS from '../actions/createGmailTabAction'
import {
    ipcRenderer
} from 'electron'
const initState = {
    otpChoose: 0,
    otpAPIKEY: "",
    ip: {
        ipAddress: "0.0.0.0",
        checked: 1,
        dcomName: "",
        apiTinsoft: ""
    },
    passwordDefaultChecked: false,
    password: "toolmailmmo.com",
    notSecureChecked: true,
    openImapPOP3Checked: true,
    saveProfileChecked: true,
    deletePhoneChecked: true,
    avatar: {
        checked: false,
        url: ""
    },
    mailRecoverChecked: true,
    mailRecover: ""
}

export default function reducer(state = {
    ...initState
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case ACTIONS.OTP_SMS_CHOOSE:
            ipcRenderer.send("u", {
                case: 1,
                value: payload
            })
            return {
                ...state,
                otpChoose: payload
            }
            break;
        case ACTIONS.OTP_SMS_API_KEY:
            ipcRenderer.send("u", {
                case: 2,
                value: payload
            })
            return {
                ...state,
                otpAPIKEY: payload
            }
            break;
        case ACTIONS.IP_CHOOSE:
            ipcRenderer.send("u", {
                case: 3,
                value: payload
            })
            return {
                ...state,
                ip: {
                    ...state.ip,
                    checked: payload
                },
            }
            break;
        case ACTIONS.OPEN_NOT_SECURE:
            ipcRenderer.send("u", {
                case: 8,
                value: payload
            })
            return {
                ...state,
                notSecureChecked: payload
            }
            break;
        case ACTIONS.SAVE_PROFILE:
            ipcRenderer.send("u", {
                case: 10,
                value: !state.saveProfileChecked
            })
            return {
                ...state,
                saveProfileChecked: !state.saveProfileChecked
            }
            break;
        case ACTIONS.OPEN_IMAP_POP3:
            ipcRenderer.send("u", {
                case: 9,
                value: payload
            })
            return {
                ...state,
                openImapPOP3Checked: payload
            }
            break;
        case ACTIONS.DELETE_PHONE:
            ipcRenderer.send("u", {
                case: 11,
                value: !state.deletePhoneChecked
            })
            return {
                ...state,
                deletePhoneChecked: !state.deletePhoneChecked
            }
            break;
        case ACTIONS.PASSWORD_DEFAULT_CHECKED:
            ipcRenderer.send("u", {
                case: 6,
                value: !state.passwordDefaultChecked
            })
            return {
                ...state,
                passwordDefaultChecked: !state.passwordDefaultChecked
            }
            break;
        case ACTIONS.PASSWORD:
            ipcRenderer.send("u", {
                case: 7,
                value: payload
            })
            return {
                ...state,
                password: payload
            }
            break;
        case ACTIONS.ADD_MAIL_RECOVER_CHECKED:
            ipcRenderer.send("u", {
                case: 14,
                value: !state.mailRecoverChecked
            })
            return {
                ...state,
                mailRecoverChecked: !state.mailRecoverChecked
            }
            break;
        case ACTIONS.MAIL_RECOVER:
            ipcRenderer.send("u", {
                case: 15,
                value: payload
            })
            return {
                ...state,
                mailRecover: payload
            }
            break;
        case ACTIONS.AVATAR_CHECKED:
            ipcRenderer.send("u", {
                case: 12,
                value: !state.avatar.checked
            })
            return {
                ...state,
                avatar: {
                    ...state.avatar,
                    checked: !state.avatar.checked
                }
            }
            break;
        case ACTIONS.SET_AVATAR:
            ipcRenderer.send("u", {
                case: 13,
                value: payload
            })
            return {
                ...state,
                avatar: {
                    ...state.avatar,
                    url: payload
                }
            }
            break;
        case ACTIONS.DCOM_NAME:
            ipcRenderer.send("u", {
                case: 4,
                value: payload
            })
            return {
                ...state,
                ip: {
                    ...state.ip,
                    dcomName: payload
                }
            }
            break;
        case ACTIONS.TINSOFT:
            ipcRenderer.send("u", {
                case: 5,
                value: payload
            })
            return {
                ...state,
                ip: {
                    ...state.ip,
                    apiTinsoft: payload
                }
            }
            default:
                return state
    }

}