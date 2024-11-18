import { myUser } from "./authType"

const initialState = {
    user:null
}

type Action = {
    type:"SETUSER"|"RESETUSER"
    payload:myUser,
}

const authReducer = (state=initialState, action:Action) => {
    switch(action.type){
        case "SETUSER":{
            return{
                ...state,
                user: action?.payload
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