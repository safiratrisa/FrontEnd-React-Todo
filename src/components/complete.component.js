import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';

export default class Completed extends Component {
    state = {
        todos: []
    }
    componentDidMount() {
        this.getTodos()
    }
    convertTime (date) {
        return moment(date).format('LLLL')
    }
    getTodos() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.get(`todos/completed/${localStorage.getItem('userID')}`, config)
        .then(res => {
            this.setState({
                todos: res.data.result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="admin-box">
                <h2>Complete</h2>
                <div className="box">
                {this.state.todos.map(todo =>
                    <div key={todo.todoid} className="eachbox">
                        <h4>{todo.label} : {todo.task}</h4>
                        <h6> created at: {this.convertTime(todo.created_at)}</h6>
                        <h6> completed at: {this.convertTime(todo.updated_at)}</h6>
                    </div>    
                    )}
                </div>
            </div>
        );
    }
}