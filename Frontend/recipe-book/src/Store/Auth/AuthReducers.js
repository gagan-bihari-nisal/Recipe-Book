const initialState = {
    token: null,
    isAuthenticated: false,
    username: null,
}

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
export default authReducer;