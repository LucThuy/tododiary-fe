import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
        },
    };
};

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE,
    };
};

const loginUser = (userData) => (dispatch) => {
    axios
        .post('http://localhost:8080/api/auth/login', userData)
        .then((res) => {
            const token = res.data.accessToken;
            const decoded = jwt_decode(token);
            dispatch(loginSuccess(decoded));
        })
        .catch((err) => {
            dispatch(loginFailure());
        });
};

export { loginUser, loginSuccess, loginFailure };
