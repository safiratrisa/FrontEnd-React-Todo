import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Nav from './components/nav.component'
import Verify from './components/verify.component'
import Label from './components/labelling.component'
import Todos from './components/todos.component'
import Todolist from './components/todolist.component'
import Completed from './components/complete.component'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'

 export default class App extends Component {
  state = {};
  componentDidMount = () => {
    axios.get(`users/${localStorage.getItem('userID')}`)
    .then(res => {
      this.setUser(res.data.result[0])
    })
    .catch(err => {
        console.log(err.response)
    })
  };
  setUser = (username) => {
    this.setState({
      username: username,
    })
  }
   render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Nav username={this.state.username} setUser={this.setUser}/>
        {/* <div className="auth-wrapper"> */}
          {/* <div className="auth-inner"> */}
            <Switch>
              <Route exact path='/' component={() => <Home username={this.state.username}/>} />
              <Route exact path='/login' component={() => <Login setUser={this.setUser}/>}/>
              <Route exact path='/register' component={Register} /> 
              <Route exact path='/verify' component={Verify} /> 
              <Route exact path='/label' component={Label} />
              <Route exact path='/todos' component={() => <Todos setUser={this.setUser}/>} />
              <Route exact path='/todolist' component={Todolist} />
              <Route exact path='/completed' component={Completed} />
            </Switch>
          {/* </div> */}
        {/* </div> */}
      </div>
      </BrowserRouter>
    );
   }
}
