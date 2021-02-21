import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
export default class Login extends Component {
    state = {}
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        }
        axios.post('users/login', data)
        .then(res => {
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('userID', res.data.result.id)
            localStorage.setItem('role', res.data.result.role)
            this.setState({
                loggedIn: true
            })
            this.props.setUser(res.data.result.username)
        })
        .catch(err => {
            console.log(err.response.data.err.message)
            Swal.fire({
                title: err.response.data.err.message,
                icon: 'error'
              })
        })
    }

    render() {
        if(this.state.loggedIn) {
            return <Redirect to={'/'}/>;
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange={e => this.username = e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-black">Login</button>
            </form>
            </div>
            </div>
        );
    }
}