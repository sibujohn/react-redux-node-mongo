import React, { Component } from 'react'

class UserComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      customerName : "Customer Name"
    }
  }
  render(){
    return (
      <div className="brand-title mx-4">
        <span>Customer Lookup</span>
        <h5>{this.props.selectedCustomer && this.props.selectedCustomer.customername}</h5>
      </div>
    )
  }
}

export default UserComponent
