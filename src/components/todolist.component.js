import React, { Component } from 'react';
import axios from 'axios'

export default class Todolist extends Component {
    state = {
        todos: [],
        open: false,
        todoid: '',
        title: ''
    }
    componentDidMount() {
        this.getTodos()
    }
    getTodos() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.get(`todos/uncompleted/${localStorage.getItem('userID')}/${localStorage.getItem('labelid')}`, config)
        .then(res => {
            this.setState({
                todos: res.data.result,
                title: res.data.result[0].label
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    completing(id) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.put(`todos/completing/${id}`, config)
        .then(res => {
            this.getTodos()
        })
        .catch(err => {
            console.log(err)
        })
    }
    delete(id) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.delete(`todos/${id}`, config)
        .then(res => {
            this.getTodos()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    insert(e) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        // e.preventDefault();
        const data = {
            task: this.taskinsert
        }
        axios.post(`todos/inserttodo/${localStorage.getItem('userID')}/${localStorage.getItem('labelid')}`, data, config)
        .then(res => {
            this.getTodos()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    edit (id) {
        if (!this.state.open) {
            this.setState({
                open: true,
                todoid: id
            })
        } else {
            this.setState({
                open: false
            })
        }
    } 
    edittask(id, e) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        // e.preventDefault();
        const data = {
            task: this.taskedit,
        }
        axios.put(`todos/updatetask/${id}`, data, config)
        .then(res => {
            this.getTodos()
        })
        .catch(err => {
            console.log(err.response.data.err.message)
        })
    }
    render() {
        let open, labeltitle;
        if(this.state.open) {
            open = (
                <div className="editform">
                    <input type="text" className="form-control" placeholder="Edit Task" onChange={e => this.taskedit = e.target.value}/> 
                <button onClick={() => {
                    this.edittask(this.state.todoid)
                    this.setState({
                        open: false
                    })
                    }}>Edit</button> 
                </div>
            )
        }
        if(this.state.result !== []) {
            labeltitle = (
                <div>
                    <h4>{this.state.title}</h4>
                </div>
            )
        }
        return (
            <div className="admin-box">
                <h2>To Do List</h2>
                {/* <h4>{this.state.title}</h4> */}
                {labeltitle}
                <div className="box">
                {this.state.todos.map(todo =>
                    <div key={todo.todoid}>
                        <div className="eachbox">
                            <h6>{todo.task}</h6>
                            <button onClick={() => {this.completing(todo.todoid)}}>Complete</button>
                            <button onClick={() => {this.delete(todo.todoid)}}>Delete</button>
                            <button onClick={() => {this.edit(todo.todoid)}}>Edit</button>
                            {open}
                        </div>
                    </div>    
                    )}
                </div>
                <div className="insertform">
                    <input type="text" className="form-control" placeholder="Insert Task" onChange={e => this.taskinsert = e.target.value}/>
                    <button onClick={() => {this.insert()}}>Insert</button>
                </div>
            </div>
        );
    }
}