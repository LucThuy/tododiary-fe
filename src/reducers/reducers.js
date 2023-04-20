import { LOGIN_SUCCESS, LOGIN_FAILURE } from '~/actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        }
        case LOGIN_FAILURE: {
            return state;
        }
        default: {
            return state;
        }
    }
};

export default authReducer;
