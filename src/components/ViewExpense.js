import React from 'react'
import axios from 'axios'
import {Button, Modal} from 'react-bootstrap'
export default class ViewExpense extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expense: {}
    }
  }

  async getExpense(id){
      //console.log(id)
    let data =  await axios.get(`http://localhost:3000/expenses/${id}`)
    await this.setState({expense: data.data})            
    //console.log(this.state.expense)
}
  async componentWillMount(){
      //await this.setState({expense: {}})
      //console.log("ViewExpense id="+this.props.id)
    await this.getExpense(this.props.id)
  }
  render(){
    return (
        <div>
            <div className="static-modal">
                <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Expense #{this.state.expense.id}</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                        <h3>Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.expense.date}</h3>
                        <h3>Category : {this.state.expense.category}</h3>
                        <h3>Amount&nbsp;&nbsp;&nbsp;: {this.state.expense.amount}</h3>
                        <h3>Note&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{this.state.expense.details}</h3>
                </Modal.Body>
            
                <Modal.Footer>
                    <Button bsStyle="warning" onClick = {()=>this.props.closeModal()} >Close</Button>
                    {/* <Button bsStyle="primary">Save changes</Button> */}
                </Modal.Footer>
            
                </Modal.Dialog>
            </div>
        </div>
      );
  }
}