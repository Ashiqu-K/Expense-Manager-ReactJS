import React from 'react'
const Category=({category,remove})=>{
    return(
        <li className="list-group-item list-group-item-secondary" >
            <button type="button" className="btn btn-danger"  onClick={()=>remove(category.id)} style={{marginLeft:'10px',marginRight:'10px'}}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            {category.name}
        </li>
    );

} 
const CategoryList=({categories, remove})=>{

    
        // Map through the categories
     const categoryNode = categories.map((category) => {
     return (<Category category={category} key={category.id} remove={remove}/>)
    });
    return (<ul className="list-group" style={{listStyle:'none'}}>{categoryNode}</ul>);
}

export default CategoryList

