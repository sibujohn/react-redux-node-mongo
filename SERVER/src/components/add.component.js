import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

class AddComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchLine : ""
    }
  }
  componentDidMount() {
    this.props.RequestLineItems(this.state.searchLine, {skip:0, limit:10})
  }
  updateSearchLine = event =>{
    event.stopPropagation()
    this.setState({
      searchLine:event.target.value
    })
    this.triggerLineSearch(event.target.value, {skip:0, limit:10})
  }
  triggerLineSearch = (value, options) =>{
    this.props.RequestLineItems(value, options)
  }
  onVirtualScroll = (event) => {
    this.props.RequestLineItems(this.state.searchLine, {skip:event.first, limit:event.rows})
  }
  selectLines = (selected) => {
    this.props.SelectLineItems(this.props.selectedLines, selected)
  }
  render(){
    return (
      <div className="full-height">
        <div className="search-box w-100" >
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search lineitem..." value={this.state.searchLine} onChange={this.updateSearchLine}/>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </div>
        <div className="add-list-elements">
        <DataTable value={this.props.lineItems.docs} scrollable={true} virtualScroll={true} virtualRowHeight={30}
            rows={10} totalRecords={this.props.lineItems.total} lazy={true} onVirtualScroll={this.onVirtualScroll}
            selection={this.props.selectedLines} responsive={true}
            onSelectionChange={e => this.selectLines(e.value)} loading={this.props.lineItems.loading}
          >
            <Column selectionMode="multiple" style={{width:'3em'}}/>
            <Column field="productName" header="Product Name" />
            <Column field="desc" header="Description" />
          </DataTable>
        </div>
      </div>
    )
  }
}

export default AddComponent
