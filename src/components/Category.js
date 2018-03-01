import React from 'react'

import NavbarHeader from './NavbarHeader.js'
import CategoryForm from './CategoryForm.js'
import axios from 'axios';
import CategoryList from './CategoryList.js'
//window.id=3;
export default class Category extends React.Component {
  
  constructor(props) {
    super(props)  
    this.state = {
      categories: []
    }
  }
  
  async componentWillMount(){
   
    await this.getData()
  }
  async setCategories(){
    let categories =  await axios.get('http://localhost:3000/categories')
    let str = JSON.stringify(categories)  
    localStorage.setItem('categories',str)               
}
  async getData(){
    if (localStorage.getItem('categories')) {
      let str = localStorage.getItem('categories')
      let data = JSON.parse(str)
      await this.setState({categories: data.data}) 
      console.log('here',this.state.categories)
    } else {
      let data =  await axios.get('http://localhost:3000/categories')
      this.setState({categories: data.data})  
    }      
  }
  async add(val){
    await axios.post('http://localhost:3000/categories',{"name":val})
    await this.setCategories()
    await this.getData()
  }
    // Handle remove
    async handleRemove(id){
      
      try {
        await axios.delete(`http://localhost:3000/categories/${id}`)
        await this.setCategories()
        // Filter all categories except the one to be removed
        const remainder = this.state.categories.filter((todo) => {
        if(todo.id !== id) return todo;
        });
        // Update state with filter
        this.setState({categories: remainder});

      } catch(error){
        window.alert("Somthing went wrong !!")
      }
    }


  render(){
    return (
        <div>
            <NavbarHeader/>
            <div className="container">
                <h1>Categories</h1>
                <div >
                <CategoryList 
                    categories={this.state.categories}
                     remove={(id)=>this.handleRemove(id)}
                /> 
                <CategoryForm addForm={(val)=>this.add(val)}/>
                </div>
                
            </div>
        </div>
      );
  }
}