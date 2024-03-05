export const loginSuccess = (token, username) => ({
    type: 'LOGIN_SUCCESS',
    token,
    username,
})

export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
})