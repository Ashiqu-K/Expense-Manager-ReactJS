import React,{ReactDOM, mountNode} from "react"
import { FormControl, FormGroup, ControlLabel, HelpBlock, InputGroup, Button} from 'react-bootstrap'
import axios from 'axios'
export default class ExpenseForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        categories: []
      }
    }
    async componentDidMount(){
      await this.getCategories()
      
    }
    async getCategories(){
      if (localStorage.getItem('categories')) {
        let str = localStorage.getItem('categories')
        let data = JSON.parse(str)
        await this.setState({categories: data.data}) 
        console.log('here',this.state.categories)
      } else {
        let data =  await axios.get('http://localhost:3000/categories')
        this.setState({categories: data.data})  
      }                  
    }
   
    
    render(){
      return(
        <form>
        <FormGroup>
            <ControlLabel>Date</ControlLabel>
            <InputGroup>
                <FormControl type="date" onChange={(e) => this.props.onFormChange('date', e.target.value)}/>
            </InputGroup>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Amount</ControlLabel>
            <InputGroup>
                <InputGroup.Addon><i className="fa fa-inr" aria-hidden="true"></i></InputGroup.Addon>
                <FormControl type="number" onChange={(e) => this.props.onFormChange('amount', e.target.value)}/>
            </InputGroup>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Category</ControlLabel>
          <FormControl componentClass="select" placeholder="Choose Category" onChange={(e) => this.props.onFormChange('category', e.target.value)}>
            {this.state.categories.map((category, index) => {
              return (
                <option key={category.id}>{category.name}</option>
              )
            }
            )} 
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Details</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Enter details" onChange={(e) => this.props.onFormChange('details', e.target.value)} />
        </FormGroup>
      </form>
      );

    }
}
  