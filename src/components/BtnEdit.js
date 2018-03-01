import React from 'react'
const BtnEdit = (props)=>{
    return(
        <button type="button" className="btn btn-info" onClick ={()=>{
            props.onBtnEditClick()
            }}>
            Edit&nbsp;
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
    );
}
export default BtnEdit