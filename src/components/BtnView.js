import React from 'react'
import ViewExpense from './ViewExpense.js'
export default class BtnView extends React.Component {
    
    render(){
        return(
                <button type="button" className="btn btn-primary"  onClick ={()=>{
                    this.props.onBtnViewClick()
                    }}>
                    View <i className="fa fa-file-text-o" aria-hidden="true"></i>
                </button>
        )
    }
}