import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducers';
import thunk from 'redux-thunk';

const persistConfig = { key: 'auth', storage };

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
