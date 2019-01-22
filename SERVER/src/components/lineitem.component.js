import React, { Component } from 'react'

import DetailComponent from './detail.component'
import AddComponent from './add.component'

class LineItemComponent extends Component{
    toggleLineItemMode = (event, mode) =>{
        this.props.toggleLineItemMode(mode)
    }
    render(){
        return (
            <div className="full-height">
                <div className="header py-3 px-3 mb-2 bg-white d-flex flex-row justify-content-between">
                    <div className="title-box">
                        <label className="title ">DETAILS - LINE ITEM</label>
                    </div>
                    <div className="actions-box">
                        { this.props.selectedOrder && 
                            <button type="button" className="btn btn-sm icon-save" 
                                onClick={(e) => this.toggleLineItemMode(e, !this.props.lineItemMode)}>
                                <i className={this.props.lineItemMode ? 'fas fa-save' : 'fas fa-plus'}></i>
                            </button>
                        }
                    </div>
                </div>     
                <div className="item-area">
                    {!this.props.lineItemMode &&
                        <DetailComponent 
                            selectedOrder={this.props.selectedOrder || (this.props.orders && this.props.orders[0])}
                            RemoveLineItems={this.props.RemoveLineItems}
                            EditLineItems={this.props.EditLineItems}
                            UpdateLineUnits={this.props.UpdateLineUnits}
                            SaveLineUnits={this.props.SaveLineUnits}>
                        </DetailComponent>
                    }
                    {this.props.lineItemMode && 
                        <AddComponent 
                            lineItems={this.props.lineItems} 
                            selectedLines = {this.props.selectedLines}
                            RequestLineItems = {this.props.RequestLineItems}
                            SelectLineItems = {this.props.SelectLineItems}>
                        </AddComponent>
                    }
                </div>
            </div>
        )
    }
}

export default LineItemComponent
