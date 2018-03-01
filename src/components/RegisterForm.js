import React from 'react'
import axios from 'axios'
import {Form, ControlLabel, Col, FormControl, FormGroup, Button, HelpBlock} from 'react-bootstrap'
export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isRegisterBtnClicked : false,
          isPwdMatches: true,
          newUser:{
              name:'',
              email:'',
              password:'',
              confirmPassword:''
          },
            isVisitedName:false,
            isVisitedEmail:false,
            isVisitedPassword:false,
            isVisitedConfirmPassword:false
          }
    }
    getNameValidationState(value,isFieldVisted){
        const length = value.length;
        if(isFieldVisted){
            if (length > 0) return 'success';
            else if (length == 0) return 'error';
        }
        return null;
    }
    getEmailValidationState(value,isFieldVisted){
        const length = value.length;
        if(isFieldVisted){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return 'success';
            else return 'error'
        }
        return null;
    }
    getPwdValidationState(value) {
        const length = value.length;
        if(this.state.isVisitedPassword){
            if (length > 6) return 'success';
            else if (length > 0) return 'warning';
            else if (length ==   0) return 'error';
        }
        return null;
    }    
    getConfirmPwdValidationState(value){
        const length = value.length;
        if(this.state.isVisitedConfirmPassword){
            if(length > 0 && this.state.newUser.password === this.state.newUser.confirmPassword) return 'success'
            else return 'error';
            }
        return null;
    }      
    async onFieldClick(field) {
        await this.setState({isVisted: { ...this.state.isVisted, [field]: true} })
    }
    async setNewUserData(field, value) {
        await this.setState({newUser: { ...this.state.newUser, [field]: value} })
        console.log(field,value)
        // console.log(this.state.isVisited.email)
        
    }    
    isRegistrationSuccess(){
        if((this.getConfirmPwdValidationState(this.state.newUser.confirmPassword,this.state.isVisitedConfirmPassword) === 'success') &&
            (this.getPwdValidationState(this.state.newUser.password,this.state.isVisitedPassword) === 'success') &&
            (this.getEmailValidationState(this.state.newUser.email,this.state.isVisitedEmail) === 'success') &&
            (this.getNameValidationState(this.state.newUser.name,this.state.isVisitedName) === 'success')){
                console.log('successs')
                return true;
        }
        else return false
    }   
      
  render(){
    return (
        <div >
            <Form horizontal>
                <FormGroup controlId="formHorizontalName"
                validationState={this.getNameValidationState(this.state.newUser.name,this.state.isVisitedName)}>
                 
                    <Col componentClass={ControlLabel} sm={2}>
                         Name
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                        type="text" 
                        placeholder="Fullname" 
                        onChange={(e)=>this.setNewUserData('name',e.target.value)}
                        onClick={()=>this.setState({isVisitedName : true})} required/>
                        <FormControl.Feedback />
                        {this.getNameValidationState(this.state.newUser.name,this.state.isVisitedName) === 'error' &&
                            <HelpBlock>Name can't be empty!!</HelpBlock>
                        }
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail"
                validationState={this.getEmailValidationState(this.state.newUser.email,this.state.isVisitedEmail)}>
                 
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e)=>this.setNewUserData('email',e.target.value)}
                        onClick={()=>this.setState({isVisitedEmail : true})} />
                        <FormControl.Feedback />
                        {this.getEmailValidationState(this.state.newUser.email,this.state.isVisitedEmail) === 'error' &&
                            <HelpBlock>Invalid email !!</HelpBlock>
                        }
                    </Col>
                </FormGroup>
                
                <FormGroup controlId="formHorizontalPassword"
                 validationState={this.getPwdValidationState(this.state.newUser.password)}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e)=>this.setNewUserData('password',e.target.value)}
                        onClick={()=>this.setState({isVisitedPassword : true})}/>
                        <FormControl.Feedback />
                        {this.getPwdValidationState(this.state.newUser.password) != null && 
                            this.getPwdValidationState(this.state.newUser.password) != 'success' &&
                                <HelpBlock>Password should contain atleast 8 characters !!</HelpBlock>
                        }
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalConfirmPassword"
                validationState={this.getConfirmPwdValidationState(this.state.newUser.confirmPassword)}>
                    
                    <Col componentClass={ControlLabel} sm={2}>
                        Confirm Password
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={(e)=>this.setNewUserData('confirmPassword',e.target.value)}
                        onClick={()=>this.setState({isVisitedConfirmPassword : true})}/>
                        <FormControl.Feedback />
                        {this.getConfirmPwdValidationState(this.state.newUser.confirmPassword) === 'error' &&
                            <HelpBlock>Passwords doesnt match!!</HelpBlock>
                        }
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button 
                        type="submit" 
                        className="btn btn-success"
                        disabled = {! this.isRegistrationSuccess()}
                        onClick={(e)=>{
                            e.preventDefault() 
                            this.props.addNewUser(this.state.newUser)}}>
                        Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
                
        </div>
     );
  }
}