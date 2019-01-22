import React, { Component } from 'react'

class UserComponent extends Component{
  render(){
    return (
      <div className="brand-title mx-4">
        <span>Customer Lookup</span>
        { this.props.selectedCustomer && 
          <h5>Client Name - {this.props.selectedCustomer && this.props.selectedCustomer.customerName}</h5>
        }
      </div>
    )
  }
}

export default UserComponent
