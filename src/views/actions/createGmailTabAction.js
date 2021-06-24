export const OTP_SMS_CHOOSE = "OTP_SMS_CHOOSE"
export const OTP_SMS_API_KEY = "OTP_SMS_API_KEY"
export const IP_CHOOSE = "IP_CHOOSE"
export const DCOM_NAME = "DCOM_NAME"
export const TINSOFT = "TINSOFT"
export const OPEN_NOT_SECURE = "OPEN_NOT_SECURE"
export const OPEN_IMAP_POP3 = "OPEN_IMAP_POP3"
export const SAVE_PROFILE = "SAVE_PROFILE"
export const DELETE_PHONE = "DELETE_PHONE"
export const ADD_MAIL_RECOVER_CHECKED = "ADD_MAIL_RECOVER_CHECKED"
export const MAIL_RECOVER = "MAIL_RECOVER"
export const AVATAR_CHECKED = "AVATAR_CHECKED"
export const SET_AVATAR = "SET_AVATAR"
export const PASSWORD_DEFAULT_CHECKED = "PASSWORD_DEFAULT_CHECKED"
export const PASSWORD = "PASSWORD"

export function updateOtpChoose(x) {
    console.log(x)
    return function (dispatch) {
        dispatch({
            type: OTP_SMS_CHOOSE,
            payload: 2
        })
    }
}