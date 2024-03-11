import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const initialState = {
    token: null,
    isAuthenticated: false,
    username: null,
}
const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['token', 'isAuthenticated', 'username'],
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': return {
            ...state, token: action.token, isAuthenticated: true, username: action.username
        };
        case 'LOGOUT_SUCCESS': return {
            ...state, token: null, isAuthenticated: false,
            username: null,
        };
        default:
            return state;
    }
}

export default persistReducer(authPersistConfig, authReducer);
