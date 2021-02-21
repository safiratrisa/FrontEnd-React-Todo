import React, { Component } from 'react';
import axios from 'axios'

export default class Verify extends Component {
    state = {
        friends: []
    }
    componentDidMount() {
        this.getFriends()
    }
    getFriends() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.get('users/unconfirmed', config)
        .then(res => {
            this.setState({
                friends: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    verification(id) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.put(`users/confirmed/${id}`, config)
        .then(res => {
            this.getFriends()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="admin-box">
                <h3>Verify</h3>
                    {this.state.friends.map(name =>
                    <div key={name.id} className="editform">
                        <div className="labeltitle">{name.username}</div>
                        <button onClick={() => {this.verification(name.id)}}>Verify</button>
                    </div>    
                    )}
            </div>
        );
    }
}