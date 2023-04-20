import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: authReducer,
    middleware: [thunk],
});

export default store;
