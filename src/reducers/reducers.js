import { LOGIN_SUCCESS, LOGIN_FAIL } from '~/actions/types';
import { REGISTER_SUCCESS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        }
        case LOGIN_FAIL: {
            return state;
        }
        case REGISTER_SUCCESS: {
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
