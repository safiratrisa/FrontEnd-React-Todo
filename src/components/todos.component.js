import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export default class Todos extends Component {
    state = {
        labels: []
    }
    componentDidMount() {
        this.getLabels()
    }
    getLabels() {
        axios.get('labels/all-labels')
        .then(res => {
            this.setState({
                labels: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    goPage(id) {
        localStorage.setItem('labelid', id)
        this.setState({
            goto: true
        })
    }
    render() {
        if(this.state.goto) {
            return <Redirect to={'/todolist'}/>;
        }
        return (
            <div className="admin-box">
                <h2>Todos</h2>
                <div className="button-todo">
                {this.state.labels.map(label =>
                    <button key={label.id} onClick={() => {this.goPage(label.id)}}>
                        <div>{label.label} : {label.description}</div>
                    </button>    
                    )}
                </div>
            </div>
        );
    }
}