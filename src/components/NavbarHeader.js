import React, {Component} from 'react'
import {  NavItem, Navbar, Nav } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import wallet from './wallet.png'
import axios from 'axios'
class NavbarHeader extends Component {
  
  constructor(props) {
    super(props)  
    {this.state = {
      user: []
    }
 } }
  async componentWillMount(){
    let str = localStorage.getItem('user')
    let data = JSON.parse(str)
    await this.setState({user: data.data}) 
    console.log(this.state.user[0].name)
  }
  logout(){
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }
  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={wallet} alt ="wallet"></img>
          </Navbar.Brand>
          <h5 ><b>Expense Manager</b></h5>
          
        </Navbar.Header>
        <Nav>
          <NavItem componentClass="span" eventKey={1} ><Link to="/">Expense</Link></NavItem>
          <NavItem componentClass="span" eventKey={2} ><Link to="/category">category</Link></NavItem>
          <NavItem componentClass="span" eventKey={3} ><Link to="/report">Report</Link></NavItem>
        </Nav>
        <Nav className="pull-right logout badge badge-info">
          <NavItem componentClass="span" eventKey={4} ><h4 style ={{marginRight:'20px'}}><i className="fa fa-user-circle-o" aria-hidden="true"></i> {this.state.user[0].name}</h4></NavItem>
          <NavItem componentClass="span" eventKey={5} ><button type="buttton" className="btn btn-warning" onClick={()=>{this.logout()}}>Logout</button></NavItem>
        </Nav>
      </Navbar>
    )
  }
  
  
}
export default withRouter(NavbarHeader)