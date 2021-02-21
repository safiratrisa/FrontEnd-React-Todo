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
        axios.get('users/unconfirmed')
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
        axios.put(`users/confirmed/${id}`)
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