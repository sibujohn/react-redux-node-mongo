import React, { Component } from 'react'

class DetailComponent extends Component{ 
  removeLineItem = (event, item) =>{
    this.props.RemoveLineItems(this.props.selectedOrder, item)
  }
  editLineItem = (event, item) =>{
    this.props.EditLineItems(item)
  }
  editItemUnits = (event, item) =>{
    this.props.UpdateLineUnits(event.target.value, item)
  }
  saveLineUnits = (event, item) =>{
    this.props.SaveLineUnits(this.props.selectedOrder, item)
  }
  render(){
    return (
      <div className="scroller">
        { this.props.selectedOrder && this.props.selectedOrder.lineItems
          && this.props.selectedOrder.lineItems.map((item, index) =>
          <div className="card card-line-item mb-3" key={index}>
            <div className="card-body pb-2">
                <div className="card-title-box d-flex flex-row justify-content-between">
                    <label className="card-title">NAME</label>
                    <div className="actions-box">
                        {!item.editMode &&
                          <span className="mr-3 icon-trash" onClick={e => this.removeLineItem(e, item)}>
                              <i className="fas fa-trash"></i>
                          </span>
                        }
                        {!item.editMode &&
                          <span className="ml-3 icon-edit" onClick={e => this.editLineItem(e, item)}>
                              <i className="fas fa-edit"></i>
                          </span>
                        }
                        {item.editMode &&
                          <span className="ml-3 icon-edit" onClick={e => this.saveLineUnits(e, item)}>
                              <i className="fas fa-save"></i>
                          </span>
                        }
                    </div>
                </div>
                <form className="form app-form form-disabled mt-2">
                    <div className="form-group">
                        <label >UOM</label>
                        <input type="text" id="name" className="form-control form-control-sm" value={item.uom} disabled="true"/>
                    </div>
                    <div className="form-group">
                        <label >COST</label>
                        <input type="text" id="cost" className="form-control form-control-sm" value={item.cost} disabled="true"/>
                    </div>
                    <div className="form-group">
                        <label >UNITS</label>
                        <input type="text" id="units" className="form-control form-control-sm" onChange={(e)=>this.editItemUnits(e, item)}
                        disabled={!item.editMode}  value={item.unit}/>
                    </div>
                    <div className="form-group">
                        <label >DESCRIPTION</label>
                        <textarea type="text" id="description" rows="3" className="form-control form-control-sm" value={item.desc} disabled="true"></textarea>
                    </div>
                </form>
            </div> 
          </div>
          )
        }
      </div>
    )
  }
}

export default DetailComponent
