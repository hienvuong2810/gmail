import { ipcRenderer } from "electron"

export const UPDATE_LIST = "UPDATE_LIST"


export  function initData() {
    // init value gmail

    return async function (dispatch) {
        const list = await ipcRenderer.invoke('iv')
        dispatch({
            type: UPDATE_LIST,
            payload: list
        })
    }
}