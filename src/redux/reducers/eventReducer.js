import {
    EVENT_GET_LIST
} from "../actions/types";
import { combineReducers } from 'redux';

const eventListState = {
    data: {},
    isLoading: false,
    error: null
};

const eventList = (state = eventListState, action) => {
    switch (action.type) {
        case EVENT_GET_LIST:
            if (!action.error) {
                return {
                    ...state,
                    data: action.data,
                    isLoading: false,
                    error: action.error
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                    error: action.error
                };
            }
        default:
            return state;
    }
}

const userReducer = combineReducers({
    eventList
})

export default userReducer;


