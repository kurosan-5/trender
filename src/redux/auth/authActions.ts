import { myUser } from "./authType"


export const setUser = (value:myUser) => {
    return {
        type: "SETUSER",
        payload: value
    }
}

export const resetUser = () => {
    return {
        type: "RESETUSER",
        payload: null
    }
}