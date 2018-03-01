import React from 'react'
import ExpenseForm from './ExpenseForm.js'
export default class NewExpense extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          newExpense: {
  
          }
        }
      }
    async setNewExpenseData(field, value) {
        await this.setState({newExpense: { ...this.state.newExpense, [field]: value} })
        console.log(field,value)
      }
    // async setNewExpense() {
    //     await axios.post('http://localhost:3000/expenses',this.state.newExpense)
    // }
  render(){
    return (
        
            <div className="pull-right" >
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#expenseFormModal">
                    New Expense <i className="fa fa-plus-square" aria-hidden="true"></i>
                </button>
                <div className="modal fade" id="expenseFormModal">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Enter the details of the expense:</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <ExpenseForm onFormChange= {(field,value) => this.setNewExpenseData(field,value)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick ={() => {
                                    this.props.addNewExpense(this.state.newExpense)
                                    }} >SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
      );
  }
}