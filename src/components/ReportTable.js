import React from 'react'
let sum = 0
export default class ExpenseTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
      }
      
      findTotalExpense(){
           sum=0
           {this.props.expenses.map((expense) => {
               sum += parseInt(expense.amount)
            
             }
            )
        } 
          console.log(sum)
        return(sum)
      }

  render(){
    return (
        <div>
            <div className="container">
                
                <p>The table below reports the expenses on the selected date and category</p>            
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.expenses.map((expense, index) => {
                            return (
                                <tr className="table-warning" key={expense.id}>
                                    <td>{expense.id}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.details}</td>
                                   
                                </tr>
                                )
                             }
                            )
                        } 
                    </tbody>
                    
                </table>
                <h3>Total Expense = <i className="fa fa-inr" aria-hidden="true"></i>&nbsp;{this.findTotalExpense()}</h3>
            </div>
        </div>

      );
  }
}