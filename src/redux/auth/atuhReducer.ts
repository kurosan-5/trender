import { User } from "firebase/auth"

const initialState = {
    user:null
}

type Action = {
    type:"SETUSER"|"RESETUSER"
    payload:User,
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