import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as actionCreators from "./authActions"

export const useAuthActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actionCreators, dispatch);
}