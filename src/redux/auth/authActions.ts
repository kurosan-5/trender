import { User } from "firebase/auth"

export const setUser = (value:User) => {
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