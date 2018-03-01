import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import EnsureAthenticated from './components/EnsureAthenticated.js'
import Expense from './components/Expense.js'
import Category from './components/Category.js'

import Login from './components/Login.js'
import Report from './components/Report.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  async getData(){
    let data =  await axios.get('http://localhost:3000/categories')
    this.setState({categories: data.data})            
  }
  async componentDidMount(){
    await this.getData()
    
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <EnsureAthenticated>
            <Route path="/category" component={Category}></Route>
            <Route path="/report" component={Report}></Route>
            <Route exact path="/" component={Expense}></Route>
          </EnsureAthenticated>
        </Switch>
      </div>
    );
  }
}

export default App;
