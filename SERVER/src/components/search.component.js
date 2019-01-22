import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest';

import { SearchCustomers, ClearCustomers } from '../actions/home.actions'

class SearchComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      isSelected : false
    }
  }
  render(){    
    const getCustomerValue = customer => {
      return customer.customerId
    }
    const getCustomer = text => {
      let customer = this.props.customers.filter( item => {
        return item.customerName == text
      })
      return customer[0]
    }
    const renderCustomer = customer => {
      return (
        <span onClick={(e)=>selectCustomer(e, customer)}>{customer.customerName}</span>
      );
    }
    const selectCustomer = (e, customer) =>{
      this.props.customerSelected(customer)
    }
    const onCustomerValueChange = (e) => {
      if(e.target && e.target.textContent){
        this.props.updateCustomerValue(e.target.textContent)
        this.props.customerSelected(getCustomer(e.target.textContent))
      }
      else if(e.target){
        this.props.updateCustomerValue(e.target.value)
      }
    }
    const { searchText, customers, SearchCustomers, ClearCustomers } = this.props;
    const inputProps = {
      placeholder: "Search customer..",
      value: searchText,
      onChange: onCustomerValueChange
    };
    return (
      <div className="tools-box w-50 mr-4 d-flex flex-row align-items-center">
        <div className="search-box">
            <div className="input-group input-group-sm">
              <Autosuggest 
                suggestions={customers}
                onSuggestionsFetchRequested={SearchCustomers}
                onSuggestionsClearRequested={ClearCustomers}
                getSuggestionValue={getCustomerValue}
                renderSuggestion={renderCustomer}
                inputProps={inputProps}
              />
              <div className="input-group-prepend">
                  <span className="input-group-text">
                      <i className="fas fa-search"></i>
                  </span>
              </div>
            </div>
        </div>
        <div className="user-box ml-4">
            <span className="user-avathar-link">
                <img alt="" className="user-avathar img img-fluid" src="./images/a5.png"/>
            </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { searchText, customers } = state.homeState.componentState;
  return {
    searchText,
    customers
  }
}

const mapDispatchToProps = dispatch => ({
  SearchCustomers : SearchCustomers(dispatch),
  ClearCustomers : ClearCustomers(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
