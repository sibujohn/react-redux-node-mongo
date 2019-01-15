import React from 'react'

class UserComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      customerName : "Customer Name"
    }
  }
  render(){
    return (
      <div className="brand-title mx-4">
        <h5>{this.state.customerName}</h5>
      </div>
    )
  }
}

export default UserComponent
