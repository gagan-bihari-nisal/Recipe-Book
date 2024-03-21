import React, { Component } from 'react'
import '../Styles/AuthComponent.css';
import { LinearProgress } from '@mui/material';
import UserService from '../Services/UserService';
import AuthenticationService from '../Services/AuthenticationService';
import { store } from '../Store/Store.js';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
class AuthComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showProgress: false,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            isLoginMode: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.authClicked = this.authClicked.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLogin = (e) => {
        UserService.getToken(this.state.username, this.state.password)
            .then(response => {
                const authService = new AuthenticationService(store);
                authService.registerSuccessfulLogin(this.state.username, response.data.token);
                this.setState({ showProgress: false })
                toast.success("Logged In Successfully")
                this.props.navigate(`/recipes`)
            })
            .catch(error => {
                this.setState({
                    showProgress: false,
                })
                if (error.response) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something went wrong")
                }
            }
            )
    }
    handleRegister = (e) => {
        UserService.registerUser(this.state.firstName, this.state.lastName, this.state.username, this.state.password)
            .then(response => {
                toast.success("Registered Successfully")
                this.setState({ showProgress: false })
            })
            .catch(error => {
                this.setState({
                    showProgress: false,
                })
                if (error.response) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something went wrong")
                }
            })
    }

    authClicked = (e) => {
        e.preventDefault();
        this.setState({ showProgress: true })
        // first we'll check whether its login or signup
        if (this.state.isLoginMode) {
            this.handleLogin(e);
        } else {
            this.handleRegister(e);
        }

    }

    switchMode = (e) => {
        this.setState((prevState) => ({
            isLoginMode: !prevState.isLoginMode
        }));
    }

    render() {
        const authService = new AuthenticationService(store)
        const isAuthenticated = authService.isUserLoggedIn();
        return (
            <>
                {
                    this.state.showProgress && <LinearProgress />
                }
                {!isAuthenticated ? <div className="container dark-theme">
                    <form onSubmit={this.authClicked}>

                        <div className="text-light text-center">
                            <h4>{this.state.isLoginMode ? 'Login' : 'Sign Up'}</h4>
                        </div>
                        {!this.state.isLoginMode && (
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bi bi-person-fill text-light" style={{ fontSize: "20px" }}></i>
                                </span>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="firstName" name="firstName"
                                        required={this.state.isLoginMode ? false : true}
                                        onChange={this.handleChange}
                                        placeholder='First Name' />
                                    <label htmlFor="firstName">First Name</label>
                                </div>
                            </div>
                        )}
                        {!this.state.isLoginMode && (
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bi bi-person-fill text-light" style={{ fontSize: "20px" }}></i>
                                </span>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="lastName" name="lastName"
                                        required={this.state.isLoginMode ? false : true}
                                        onChange={this.handleChange} placeholder='last Name' />
                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                            </div>

                        )}
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="bi bi-emoji-smile-fill text-light" style={{ fontSize: "20px" }}></i>
                            </span>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="username" name="username" required onChange={this.handleChange}
                                    placeholder='Username' />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="bi bi-key-fill text-light" style={{ fontSize: "20px" }}></i>
                            </span>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="password" required name="password" onChange={this.handleChange}
                                    placeholder='Password' />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>



                        <div className="input-group mb-3">
                            <button className="btn btn-login" type="submit" >
                                {this.state.isLoginMode ? 'Login' : 'Sign Up'}
                            </button>
                        </div>
                        <div className="input-group mb-3">
                            <button type="button" onClick={this.switchMode} className="btn btn-signup" >Switch to {this.state.isLoginMode ? 'Sign Up' : 'Login'}</button>
                        </div>
                    </form>
                </div > : <Navigate to='/recipes' />}
            </>
        )
    }
}

export default (AuthComponent);
