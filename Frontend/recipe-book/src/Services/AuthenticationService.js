import { loginSuccess, logoutSuccess } from '../Store/Auth/AuthActions';
class AuthenticationService {
    constructor(store) {
        this.store = store;
    }

    registerSuccessfulLogin(username, token) {
        this.store.dispatch(loginSuccess(token, username));
    }

    logout() {
        this.store.dispatch(logoutSuccess());
        localStorage.clear()
    }

    isUserLoggedIn() {
        const { auth } = this.store.getState();
        return auth.isAuthenticated;
    }
}

export default AuthenticationService;
