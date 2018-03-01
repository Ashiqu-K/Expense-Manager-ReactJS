import React from 'react'
import './login.css'
import wallet from './wallet.png'
import RegisterForm from './RegisterForm.js'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
export default class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isRegisterBtnClicked : false,
          isLoginSuccess: true,
          token:'',
          loginData:{
            email:'',
            password:''
          }
        }
      }
    async addNewUser(newUser){
        await axios.post('http://localhost:3000/users',newUser)
        //await this.getExpenses()
        this.setState({isRegisterBtnClicked:false})
    }
    
    async setNewLoginData(field, value) {
        await this.setState({loginData: { ...this.state.loginData, [field]: value} })
        console.log(field,value)
      }
    async onLogin(e){
        e.preventDefault()
        let user = await axios.get(`http://localhost:3000/users?email=${this.state.loginData.email}&password=${this.state.loginData.password}`)
        //await this.setState({loginData : result.data})
        if(!user.data.length) {
            this.setState({isLoginSuccess:false})
        }
        else {
          this.setState({token:'1234'})
          localStorage.setItem("token",this.state.token)
          let str = JSON.stringify(user)  
          localStorage.setItem('user',str) 
          this.props.history.push("/") 
        }
      }
  render(){
    return (
        <div className="container">
        <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
                <h1 className="text-center login-title">Sign in to continue to Expense Manager</h1>
                <div className="account-wall">
                    <img className="profile-img" src={wallet}
                        alt=""/>
                    <form className="form-signin">
                    <input type="text" className="form-control" onChange={(e)=>this.setNewLoginData('email',e.target.value)} placeholder="Email" required autoFocus/>
                    <input type="password" className="form-control" onChange={(e)=>this.setNewLoginData('password',e.target.value)} placeholder="Password" required/>
                    {this.state.isLoginSuccess === false &&
                        <div className="alert alert-danger">
                            <strong>Login failed!</strong> Email or Password doesnot match.
                        </div>
                    }
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(e)=>this.onLogin(e)}>
                        Sign in</button>
                    <label className="checkbox pull-left">
                        <input type="checkbox" value="remember-me"/>
                        Remember me
                    </label>
                    <a href="#" className="pull-right need-help">Need help? </a><span className="clearfix"></span>
                    </form>
                </div>
                {/* <a href="#" className="text-center new-account">Create an account </a> */}
                <div className="well new-account">
                    <div className="col">
                    <h5 >Are you new to Expense Manager?</h5>
                    </div>
                    <div className="col">
                    <button className="btn btn-info text-center" type="button" onClick={()=>this.setState({isRegisterBtnClicked:true})}>Create Account</button>
                    </div>
                </div>
                {this.state.isRegisterBtnClicked === true &&
                    <div className="static-modal">
                <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <RegisterForm addNewUser={(newUser)=>this.addNewUser(newUser)}/>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button bsStyle="danger"  onClick={()=>this.setState({isRegisterBtnClicked:false})}>Close</Button>
                    {/* <Button bsStyle="primary">Save changes</Button> */}
                </Modal.Footer>
            
                </Modal.Dialog>
            </div>
                }
            </div>
        </div>
    </div>
     );
  }
}