import React, { Component } from 'react'
import ReactTable from "react-table"
import 'react-table/react-table.css'

class ListComponent extends Component{
  render(){
    const columns = [{
      Header: 'Order No:',
      accessor: 'ordernumber'
    },{
      Header: 'Date',
      accessor: 'date',
    },{
      Header: 'Zip',
      accessor: 'zip'
    },{
      Header: 'State',
      accessor: 'state'
    },{
      Header: 'Created By',
      accessor: 'createdBy'
    },{
      Header: 'Picked',
      accessor: 'picked'
    },{
      Header: 'Shipped',
      accessor: 'shipped'
    }]
    return (
      <ReactTable
        data={this.props.orders}
        columns={columns}
        style={{
          height: "100%"
        }}
        showPagination={false}
        className="-striped -highlight"
        getTrProps={(state, rowInfo) => {
          if (rowInfo && rowInfo.row) {
            return {
              onClick: (e) => {
                this.props.selectOrder(rowInfo.original)
              },
              style: {
                background: rowInfo.original.ordernumber === (this.props.selectedOrder && this.props.selectedOrder.ordernumber) ? '#00afec' : 'white',
                color: rowInfo.original.ordernumber === (this.props.selectedOrder && this.props.selectedOrder.ordernumber) ? 'white' : 'black'
              }
            }
          }else{
            return {}
          }
        }}
      />
    )
  }
}

export default ListComponent
