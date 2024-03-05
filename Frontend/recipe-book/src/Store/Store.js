import { combineReducers } from 'redux';
import authReducer from './Auth/AuthReducers.js';
import { createStore } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
})

const store = createStore(rootReducer);
export default store;