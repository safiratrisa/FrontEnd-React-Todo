import React, { Component } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
export default class Register extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        }
        axios.post('users/register', data)
        .then(res => {
            Swal.fire({
                title: 'Register Succesfully',
                icon: 'success'
              })
        })
        .catch(err => {
            Swal.fire({
                title: err.response.data.err.message,
                icon: 'error'
              })
            console.log(err.response.data.err.message)
        })
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange={e => this.username = e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-black">Sign Up</button>
            </form>
            </div>
            </div>
        );
    }
}