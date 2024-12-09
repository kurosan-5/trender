import { myUser } from "./authType"

interface AuthState {
    user: myUser | null
}

const initialState : AuthState = {
    user:null
}

type Action = {
    type:"SETUSER"|"RESETUSER"
    payload?:myUser|null,
}

const authReducer = (state=initialState, action:Action) => {
    switch(action.type){
        case "SETUSER":{
            return{
                ...state,
                user: action.payload || null
            }
        }
        case "RESETUSER":{
            return{
                ...state,
                user:null
            }
        }
        default:{
            return state
        }
    }
}

export default authReducer;