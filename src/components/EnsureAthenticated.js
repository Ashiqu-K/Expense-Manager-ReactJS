import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn : false
    }
  }

  async componentWillMount(){
    if(localStorage.getItem('token')){
        this.setState({isLoggedIn : true})
    }    
  }
  render() {
      if(!this.state.isLoggedIn){
          return(<Redirect to="/login"/>)
      }
    return (
      this.state.isLoggedIn && this.props.children
    );
  }
}

export default App;
