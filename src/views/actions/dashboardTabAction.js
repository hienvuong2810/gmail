import { ipcRenderer } from "electron"
import {notification} from "antd"
export const UPDATE_LIST = "UPDATE_LIST"


export  function initData() {
    // init value gmail
    return async function (dispatch) {
        const list = await ipcRenderer.invoke('iv')
        dispatch({
            type: UPDATE_LIST,
            payload: list[1]
        })
    }
}
export function update(data) {
    // init value gmail
    return async function (dispatch) {
        dispatch({
            type: UPDATE_LIST,
            payload: data
        })
    }
}
export function Noti(message) {
    notification.error({
        message: "LỖI",
        description: message,
        duration: 0
    })

}