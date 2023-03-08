import { combineReducers } from "redux";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";

const appReducer = combineReducers({
    userReducer,
    eventReducer
});

const rootReducer = (state,action) =>{
    //if(action.type === USER_ROOT_LOG_OUT) state = undefined;
    return appReducer(state, action);
}

export default rootReducer;
