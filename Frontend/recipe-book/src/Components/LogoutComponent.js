import React, { Component } from 'react'

export default class LogoutComponent extends Component {
    render() {
        console.log("log out")
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container-fluid min-vh-100">
                    Thank You for Using Our Application.
                </div>
            </>
        )
    }
}
