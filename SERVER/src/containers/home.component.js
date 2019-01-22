import React, { Component }from 'react'
import { connect } from 'react-redux'

import { 
  UpdateCustomerValue,
  SearchCustomers,
  ClearCustomers,
  CustomerSelected,
  RequestOrders,
  UpdateOrderOptions,
  RequestLineItems,
  SelectOrder,
  ToggleLineItemMode,
  SelectLineItems,
  SaveLineItems,
  RemoveLineItems,
  EditLineItems,
  UpdateLineUnits,
  SaveLineUnits } from '../actions/home.actions'

import UserComponent from '../components/user.component'
import SearchComponent from '../components/search.component'
import ListComponent from '../components/list.component'
import LineItemComponent from '../components/lineitem.component'

class HomeComponent extends Component{
  toggleLineItemMode = (mode) => {
    if(!mode){
      this.props.SaveLineItems(this.props.selectedOrder, this.props.selectedLines)
    }
    this.props.ToggleLineItemMode(mode)
  }
  updateCustomerValue = (value) => {
    this.props.UpdateCustomerValue(value)
  }
  customerSelected = (customer) => {
    this.props.UpdateCustomerValue(customer.customerName)
    this.props.CustomerSelected(customer)
    this.props.RequestOrders(customer, this.props.orderOptions)
  }
  lazyLoadOrders = (showSpan) =>{
    if(showSpan<this.props.orderOptions.records){
      this.props.UpdateOrderOptions(this.props.orderOptions, 'lazy', showSpan, null)
      this.props.RequestOrders( this.props.selectedCustomer, this.props.orderOptions, this.props.selectedOrder)
    }
  }
  sortLoadOrders = (sortParam) =>{
    this.props.UpdateOrderOptions(this.props.orderOptions, 'sort', null, sortParam)
    this.props.RequestOrders( this.props.selectedCustomer, this.props.orderOptions, this.props.selectedOrder)
  }
  selectOrder = (selected) => {
    this.props.SelectOrder(selected)
  }
  render(){
    return (
      <div >
        <div className="app-header">
          <div className="app-main-header">
            <div className="d-flex app-toolbar align-items-center justify-content-between">
              <UserComponent selectedCustomer={this.props.selectedCustomer}/>
              <SearchComponent
                searchText={this.props.searchText}
                customers={this.props.customers}
                updateCustomerValue={this.updateCustomerValue}
                SearchCustomers={this.props.SearchCustomers}
                ClearCustomers={this.props.ClearCustomers}
                customerSelected={this.customerSelected}
                />
            </div>
          </div>
        </div>
        <div className="app-main-content d-flex flex-row">
          <section className="content-left">
            <ListComponent orders={this.props.orders} selectOrder={this.props.SelectOrder}
              selectedOrder={this.props.selectedOrder || (this.props.orders && this.props.orders[0])}
              lazyLoadOrders={this.lazyLoadOrders} orderOptions={this.props.orderOptions}
              sortLoadOrders={this.sortLoadOrders} selectedCustomer={this.props.selectedCustomer}/>
          </section>
          <section className="content-right d-flex flex-column border">
            <LineItemComponent 
              selectedOrder={this.props.selectedOrder || (this.props.orders && this.props.orders[0])}
              lineItems={this.props.lineItems}
              toggleLineItemMode={this.toggleLineItemMode}
              lineItemMode={this.props.lineItemMode}
              RequestLineItems ={this.props.RequestLineItems}
              RemoveLineItems={this.props.RemoveLineItems}
              EditLineItems={this.props.EditLineItems}
              UpdateLineUnits={this.props.UpdateLineUnits}
              SaveLineUnits={this.props.SaveLineUnits}
              
              selectedLines = {this.props.selectedLines}
              SelectLineItems = {this.props.SelectLineItems}/>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.homeState.componentState
})

const mapDispatchToProps = dispatch => ({
  UpdateCustomerValue : UpdateCustomerValue(dispatch),
  SearchCustomers : SearchCustomers(dispatch),
  ClearCustomers : ClearCustomers(dispatch),
  CustomerSelected : CustomerSelected(dispatch),
  RequestOrders : RequestOrders(dispatch),
  UpdateOrderOptions: UpdateOrderOptions(dispatch),
  RequestLineItems : RequestLineItems(dispatch),
  SelectOrder : SelectOrder(dispatch),
  ToggleLineItemMode : ToggleLineItemMode(dispatch),
  SaveLineItems : SaveLineItems(dispatch),
  RemoveLineItems : RemoveLineItems(dispatch),
  EditLineItems : EditLineItems(dispatch),
  SelectLineItems : SelectLineItems(dispatch),
  UpdateLineUnits : UpdateLineUnits(dispatch),
  SaveLineUnits : SaveLineUnits(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)