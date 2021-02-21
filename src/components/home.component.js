import React, { Component } from 'react';
import HomeNoRole from '../components/homenorole.component'

export default class Home extends Component {
    render() {
        if(parseInt(localStorage.getItem('role')) === 0) {
            return (
                <div className="auth-wrapper">
                <div className="auth-inner">
                <h2>Hi {this.props.username}</h2>
                <h2>This is Home Admin</h2>
            </div>
            </div>
            );
        } else if (parseInt(localStorage.getItem('role')) === 1) {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                    <h2>Hi {this.props.username}</h2>
                    <h2>This is Home User</h2>
                    {/* <HomeUser/> */}
                </div>
                </div>
            );
        } else {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                    <HomeNoRole/>
                </div>
                </div>
            );
        }
    }
}