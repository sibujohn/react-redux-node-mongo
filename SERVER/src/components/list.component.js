import React, { Component } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

class ListComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedSort : {label: 'Most Recent', value: 'desc'}
    }
  }
  sortOptions = [
    {label: 'Most Recent', value: 'desc'},
    {label: 'Least Recent', value: 'asc'}
  ]
  onVirtualScroll = (event) => {
    this.props.lazyLoadOrders(event.first)
  }
  selectSort = (selected)=> {
    let sort = this.sortOptions.filter(item => { return item.value === selected.value})
    this.setState({selectedSort: sort[0]})
    this.props.sortLoadOrders({sortby:'date', sorthow:selected.value})
  }
  selectOrder = (order) => {
    this.props.selectOrder(order)
  }
  selectSort
  render() {
    return (
      <div className="list-cover">
        <div className="sort-select">
          {this.props.selectedCustomer && 
            <Dropdown value={this.state.selectedSort.value} options={this.sortOptions}
              onChange={this.selectSort}/>
          }
        </div>
        <div className="list-table">
          <DataTable value={this.props.orders} scrollable={true} virtualScroll={true} virtualRowHeight={30}
            rows={20} totalRecords={this.props.orderOptions.records} lazy={true} onVirtualScroll={this.onVirtualScroll}
            selectionMode="single" selection={this.props.selectedOrder}
            onSelectionChange={e => this.selectOrder(e.value)} loading={this.props.orderOptions.loading}
          >
            <Column field="ordernumber" header="Order Number" />
            <Column field="formattedDate" header="Date" />
            <Column field="zip" header="ZIP" />
            <Column field="state" header="State" />
            <Column field="createdBy" header="Created By" />
            <Column field="picked" header="Pickked" />
            <Column field="shipped" header="Shipped" />
          </DataTable>
        </div>
      </div>
    );
  }
}

export default ListComponent
