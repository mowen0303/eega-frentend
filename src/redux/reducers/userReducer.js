import {
    USER_LOGIN,
    USER_GET,
    USER_UPDATE_MY_PROFILE
} from "../actions/types";
import { combineReducers } from 'redux';

const authState = {
    data: {},
    isLoading: false,
    error: null
};

const auth = (state = authState, action) => {
    switch (action.type) {
        case USER_LOGIN:
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
                    data: {},
                    isLoading: false,
                    error: action.error
                };
            }
        default:
            return state;
    }
}

const profileState = {
    data: {},
    isLoading: false,
    error: null
};

const profile = (state = profileState, action) => {
    switch (action.type) {
        case USER_GET:
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
        case USER_UPDATE_MY_PROFILE:
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
    auth,
    profile
})

export default userReducer;


