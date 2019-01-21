import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest';

import { SearchCustomers, ClearCustomers } from '../actions/home.actions'

class SearchComponent extends Component{

  render(){
    
    const getCustomerValue = customer => {
      return customer.customerid
    }
    const renderCustomer = customer => {
      return (
        <span onClick={(e)=>selectCustomer(e, customer)}>{customer.customername}</span>
      );
    }
    const selectCustomer = (e, customer) =>{
      e.stopPropagation()
      this.props.customerSelected(customer)
    }
    const onCustomerValueChange = (e) => {
      this.props.updateCustomerValue(e.target.value)
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
