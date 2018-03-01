import React from 'react'
import axios from 'axios'
import BtnEdit from './BtnEdit.js'
import BtnDelete from './BtnDelete.js'
import ViewExpense from './ViewExpense.js'
import EditExpense from './EditExpense.js'
import BtnView from './BtnView.js'
import moment from 'moment'

export default class ExpenseTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isViewBtnClicked : false,
          isEditBtnClicked : false,
          viewId : 0,
          editId : 0
        }
      }
    activateBtnView =(BtnId)=>{
        this.setState({viewId : BtnId})
        this.setState({isViewBtnClicked:true})
    }
    deactivateBtnView =()=>{
        this.setState({isViewBtnClicked:false})
    }
    activateBtnEdit =(BtnId)=>{
        this.setState({editId : BtnId})
        this.setState({isEditBtnClicked:true})
    }
    deactivateBtnEdit =()=>{
        this.setState({isEditBtnClicked:false})
    }
  render(){
    return (
        <div>
            <div >
                
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.expenses.map((expense, index) => {
                            return (
                                <tr className="warning" key={expense.id}>
                                    <td>{expense.id}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.details}</td>
                                    <td>
                                        <BtnView onBtnViewClick = {() => {this.activateBtnView(expense.id)}}/>
                                        {
                                            this.state.isViewBtnClicked === true &&
                                                    <ViewExpense id={this.state.viewId} closeModal={()=>this.deactivateBtnView()}/>
                                            }
                                        <BtnEdit onBtnEditClick = {() => {this.activateBtnEdit(expense.id)}}/>
                                        {
                                            this.state.isEditBtnClicked === true &&
                                                    <EditExpense id={this.state.editId} addEditedExpense={(EditedExpense)=>this.props.addEditedExpense(EditedExpense)} closeModal={()=>this.deactivateBtnEdit()}/>
                                            } 
                                        <BtnDelete remove={() =>{this.props.remove(expense.id)}}/></td>
                                </tr>
                                )
                             }
                            )
                        } 
                    </tbody>
                </table>
            </div>
        </div>

      );
  }
}