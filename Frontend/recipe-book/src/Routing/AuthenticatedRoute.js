import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticationService from '../Services/AuthenticationService';
import store from '../Store/Store';
export default class AuthenticatedRoute extends Component {
  render() {
    const authService = new AuthenticationService(store);
    if (authService.isUserLoggedIn()) {
      return { ...this.props.children }
    } else {
      return <Navigate to="/auth" />
    }
  }
}   
