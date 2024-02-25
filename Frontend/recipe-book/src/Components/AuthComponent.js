import React, { Component } from 'react'
import '../Styles/AuthComponent.css';
import { LinearProgress } from '@mui/material';
export default class AuthComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showProgress: false,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            isLoginMode: true,
            hasLoginFailed: false,
            hasRegisterFailed: false,
            showSuccessMessage: false,
            errorMsg: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.authClicked = this.authClicked.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange = (e) => {

    }

    handleRegister = (e) => {

    }

    authClicked = (e) => {
        // first we'll check whether its login or signup
    }

    switchMode = (e) => {
        this.setState((prevState) => ({
            isLoginMode: !prevState.isLoginMode
        }));
    }

    render() {
        return (
            <>
                <div className="container dark-theme">
                    {
                        this.state.showProgress && <LinearProgress />
                    }
                    {!this.state.showProgress && (
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
                                            placeholder='last Name' />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>

                            )}
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bi bi-emoji-smile-fill text-light" style={{ fontSize: "20px" }}></i>
                                </span>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="username" name="username"
                                        placeholder='Username' />
                                    <label htmlFor="username">Username</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="bi bi-key-fill text-light" style={{ fontSize: "20px" }}></i>
                                </span>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="password" name="password"
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
                    )}
                </div >
            </>
        )
    }
}
