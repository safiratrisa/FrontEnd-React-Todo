import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }
    render() {
        let buttons;
        if(this.props.username && parseInt(localStorage.getItem('role')) === 0) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/verify'}>Verify Request</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/label'}>Labelling</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={this.handleLogout}>Logout</Link>
                    </li>
                </ul>
                )
        } else if (this.props.username && parseInt(localStorage.getItem('role')) === 1) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/todos'}>Todos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/completed'}>Completed</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={this.handleLogout}>Logout</Link>
                    </li>
                </ul>
                )
        } 
        else {
            buttons = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>Sign Up</Link>
                </li>
            </ul>
            )
        }
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light fixed-top">
                    <div className="container">
                    <div className="navbar-brand">Home</div>
                        {/* <Link className="navbar-brand" to={'/'}>Home</Link> */}
                        <div className="collapse navbar-collapse">
                            {buttons}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}