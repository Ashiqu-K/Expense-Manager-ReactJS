import React from 'react'
import axios from 'axios'
import {Button, Modal, FormControl, FormGroup, ControlLabel, InputGroup} from 'react-bootstrap'

export default class EditExpense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expense: {},
      EditedExpense: {},
      categories: []

    }
  }

  async getExpense(id){
    //console.log(id)
    let data =  await axios.get(`http://localhost:3000/expenses/${id}`)
    await this.setState({expense: data.data})            
    //console.log(this.state.expense)
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
  async componentWillMount(){
     // await this.setState({expense: {}})
    console.log(this.props.id)
    await this.getExpense(this.props.id)
    await this.getCategories()
  }
  async setEditedExpenseData(field, value) {
    await this.setState({expense: { ...this.state.expense, [field]: value} })
    console.log(field,value)
  }
  render(){
    return (
        <div>
            <div className="static-modal">
                <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Edit Expense #{this.state.expense.id}</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Date</ControlLabel>
                            <InputGroup>
                                <FormControl type="date" value ={this.state.expense.date} onChange={(e) => this.setEditedExpenseData('date', e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Amount</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon><i className="fa fa-inr" aria-hidden="true"></i></InputGroup.Addon>
                                <FormControl type="number" value ={this.state.expense.amount} onChange={(e) => this.setEditedExpenseData('amount', e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Category</ControlLabel>
                            <FormControl componentClass="select" placeholder="Choose Category" onChange={(e) => this.setEditedExpenseData('category', e.target.value)}>
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
                            <FormControl componentClass="textarea" placeholder="Enter details" value ={this.state.expense.details} onChange={(e) => this.setEditedExpenseData('details', e.target.value)} />
                        </FormGroup>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick ={() => {
                                    this.props.addEditedExpense(this.state.expense)
                                    }} >SAVE</button>
                    </form>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button bsStyle="warning" onClick = {()=>{this.props.closeModal()}} >Close</Button>
                    {/* <Button bsStyle="primary">Save changes</Button> */}
                </Modal.Footer>
            
                </Modal.Dialog>
            </div>
        </div>
      );
  }
}