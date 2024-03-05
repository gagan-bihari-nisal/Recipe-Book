import axios from 'axios'
import API_CONFIG from '../Constants/ApiConfig'
export default new class UserService {

    getToken(username, password) {
        const credentials = {
            'username': username,
            'password': password,
        };
        return axios.post(`${API_CONFIG.userService}/login`, credentials);
    }

    registerUser(firstName, lastName, username, password) {
        const body = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        return axios.post(`${API_CONFIG.userService}/register`, body)
    }
}