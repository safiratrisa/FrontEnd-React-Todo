import React, { Component } from 'react';

export default class HomeAdmin extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                    <div className="auth-inner">
                    <h2>Hi {this.props.username}</h2>
                    <h2>This is Home Admin</h2>
                </div>
                </div>
        );
    }
}