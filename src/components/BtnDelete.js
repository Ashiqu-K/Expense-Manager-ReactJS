import React from 'react'
const BtnDelete = (props)=>{
    return(
        <button type="button" className="btn btn-danger" onClick ={() => {props.remove()}}>
            Delete&nbsp;<i className="fa fa-trash" aria-hidden="true"></i>
        </button>
    )
}
export default BtnDelete