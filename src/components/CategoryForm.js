import React from 'react'
import './login.css'
const CategoryForm = ({addForm}) =>{
    let input;
    return(
        <div>
                <div className="container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    New Category <i className="fa fa-plus-square" aria-hidden="true"></i>
                </button>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                        
                            <div className="modal-header">
                                <h4 className="modal-title">Enter new category name:</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            
                            <div className="modal-body">
                                                
                                <input ref={node =>{
                                input=node;
                                }}/>
                                {/* <button onClick={()=>{addForm(input.value)
                                input.value=''
                                }}>+</button>   */}
                            </div>
                            
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{addForm(input.value)
                                input.value=''
                                }}>SAVE</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        
    );
}
export default CategoryForm