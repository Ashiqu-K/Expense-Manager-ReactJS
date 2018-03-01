import React from 'react'
import axios from 'axios'
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import NavbarHeader from './NavbarHeader.js'
import ReportTable from './ReportTable.js'
import moment from 'moment'
import {Pie} from 'react-chartjs-2';
//import DateRangePicker from 'react-bootstrap-daterangepicker'

export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      expenses: [],
      selectedCategory:'Any category',
      selectedDate: null,
      isBtnClicked: false,
      totalAmount: 0,
			startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      chartData :{
        labels: [
          'Red',
          'Green',
          'Yellow'
        ],
        datasets: [{
          data: [300, 50, 100]
          
        }]      
  }
}
  } 
  async componentWillMount(){
    
    await this.getCategories()
    //await this.getExpenses()
  }
  async getCategories(){
    let data =  await axios.get('http://localhost:3000/categories')
    this.setState({categories: data.data})  
    // {this.state.categories.map((category)=>
    //    this.setState({chartData: { ...this.state.chartData.labels,{category.name}} })
    // )}          
  }
  async getExpenses(){
    console.log(localStorage.getItem('categories'))
    console.log('here getexpense')
    if (this.state.selectedCategory === 'Any category') {
      let data =  await axios.get(`http://localhost:3000/expenses?date_gte=${this.state.startDate}&date_lte=${this.state.endDate}&`)
      this.setState({expenses: data.data})            
    } else {
      let data =  await axios.get(`http://localhost:3000/expenses?category=${this.state.selectedCategory}&date_gte=${this.state.startDate}&date_lte=${this.state.endDate}&`)
      this.setState({expenses: data.data})
    }
 }
 async onSubmit(e){
   e.preventDefault()
   this.setState({isBtnClicked: false})
    await this.getExpenses()
    this.setState({isBtnClicked: true})
 }
 async onStartDateChange(value) {
  await this.setState({startDate: value })
  console.log(this.state.startDate)
}

async onEndDateChange(value) {
  await this.setState({endDate: value })
  console.log(this.state.endDate)
}
  async onCategoryChange(value) {
    await this.setState({selectedCategory: value })
    console.log(this.state.selectedCategory)
  }
  render(){
    return (
      <div>
        <NavbarHeader/>
        <div className="container">
            <h1>Report</h1>
            <div className="container well">
              
              <Form inline>
                <FormGroup controlId="formInlineDate">
                  <ControlLabel>Date : </ControlLabel>
                  {' '}
                  <div className  ="input-group input-daterange">
                    <FormControl type="date" defaultValue="2017-11-1" onChange={(e) => this.onStartDateChange(e.target.value)}/>
                    <div className  ="input-group-addon">to</div>
                    <FormControl type="date"  value={this.state.endDate} onChange={(e) => this.onEndDateChange(e.target.value)}/>
                  </div>
                </FormGroup>
                
                {' '}
                <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category : </ControlLabel>
                  <FormControl componentClass="select"  placeholder="Choose Category" onChange={(e) => this.onCategoryChange(e.target.value)}>
                    <option >Any category</option>
                    {this.state.categories.map((category, index) => {
                      return (
                        <option key={category.id}>{category.name}</option>
                      )
                    }
                    )} 
                  </FormControl>
                </FormGroup>
      
                {' '}
                
                <Button type="submit" className="btn btn-info" onClick={(e) => this.onSubmit(e)}>
                  Get Report
                </Button>
                
              </Form> 
            </div>
            {this.state.isBtnClicked === true &&
              <ReportTable
              expenses={this.state.expenses}
              />
            }
            {/* <Pie data={this.state.chartData} /> */}
        </div>

      </div>
        
      );
  }
}