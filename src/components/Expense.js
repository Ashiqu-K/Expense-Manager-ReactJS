import React from 'react'
import axios from 'axios'

import NavbarHeader from './NavbarHeader.js'
import ExpenseTable from './ExpenseTable.js'
import NewExpense from './NewExpense.js'
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, InputGroup, Button} from 'react-bootstrap'
import moment from 'moment'
export default class Expense extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          expenses: [],
          sortBy:'id',
          sortOrder:'asc'
        }
      }
    async getExpenses(){
        let data =  await axios.get(`http://localhost:3000/expenses?_sort=${this.state.sortBy}&_order=${this.state.sortOrder}`)
        this.setState({expenses: data.data})            
    }
    async getCategories(){
        let categories =  await axios.get('http://localhost:3000/categories')
        let str = JSON.stringify(categories)  
        localStorage.setItem('categories',str)               
    }
    async componentWillMount(){
       
        await this.getExpenses()
        await this.getCategories()
    }
    async addNewExpense(newExpense){
        await axios.post('http://localhost:3000/expenses',newExpense)
        await this.getExpenses()
    }
    async addEditedExpense(EditedExpense){
        await axios.put(`http://localhost:3000/expenses/${EditedExpense.id}`,EditedExpense)
        await this.getExpenses()
    }
    async handleRemove(id){
        try {
            await axios.delete(`http://localhost:3000/expenses/${id}`)
            // Filter all expenses except the one to be removed
            const remainder = this.state.expenses.filter((expense) => {
            if(expense.id !== id) return expense;
            });
            // Update state with filter
            this.setState({expenses: remainder});
    
        } catch(error){
            window.alert("Somthing went wrong !!")
          }
    }
    async onSortByChange(value) {
        await this.setState({sortBy: value })
        console.log(this.state.sortBy)
      }
    
    async onSortOrderChange(value) {
        await this.setState({sortOrder: value })
        console.log(this.state.sortOrder)
      }
    render(){
        return (
            <div>
                <NavbarHeader/>
                    
                <div className="container container-body">
                    <h1>Expenses</h1>
                    <p>The table below lists the expenses upto the date: <b>{moment().format('LL')}</b></p>            

                    <div className="well sortForm">
                    <Form inline >
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Sort By:</ControlLabel>
                            {' '}
                            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.onSortByChange(e.target.value)}>
                                <option value="id">id</option>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </FormControl>
                        </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Order</ControlLabel>
                            {' '}
                            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.onSortOrderChange(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </FormControl>
                        </FormGroup>
                            {' '}
                            <Button type="button" className = "btn btn-info" onClick={() => this.getExpenses()}>
                            Sort
                            </Button>
                            
                    </Form>
                    
                    </div>
                    <ExpenseTable
                    expenses={this.state.expenses}
                    remove={(id)=>this.handleRemove(id)}
                    addEditedExpense={(EditedExpense)=>this.addEditedExpense(EditedExpense)}
                    />
                    <NewExpense
                                addNewExpense={(newExpense)=>this.addNewExpense(newExpense)}
                                />
                </div>
                
            </div>
        );
  }
}