import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
        },
    };
};

const loginFail = (err) => {
    return {
        type: LOGIN_FAIL,
        payload: {
            err,
        },
    };
};

const loginUser = (userData) => (dispatch) => {
    axios
        .post('http://localhost:8080/api/auth/login', userData)
        .then((res) => {
            const token = res.data.accessToken;
            const decoded = jwt_decode(token);
            dispatch(loginSuccess(token));
        })
        .catch((err) => {
            dispatch(loginFail(err.response.data));
        });
};

const registerSuccess = (token) => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            token,
            isRegisterSuccess: true,
        },
    };
};

const registerFail = (err) => {
    return {
        type: REGISTER_FAIL,
        payload: {
            err,
        },
    };
};

const registerUser = (userData) => (dispatch) => {
    axios
        .post('http://localhost:8080/api/auth/register', userData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            const token = res.data.accessToken;
            const decoded = jwt_decode(token);
            dispatch(registerSuccess(token));
        })
        .catch((err) => {
            dispatch(registerFail(err.response.data));
        });
};

export {
    loginUser,
    loginSuccess,
    loginFail,
    registerUser,
    registerSuccess,
    registerFail,
};
