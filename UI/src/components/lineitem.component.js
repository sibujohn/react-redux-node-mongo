import React from 'react'

import DetailComponent from './detail.component'
import AddComponent from './add.component'

class LineItemComponent extends React.Component{
    toggleLineItemMode = (event, mode) =>{
        event.stopPropagation();
        this.props.toggleLineItemMode(mode);
    }
    render(){
        return (
            <div className="full-height">
                <div className="header py-3 px-3 mb-2 bg-white d-flex flex-row justify-content-between">
                    <div className="title-box">
                        <label className="title ">DETAILS - LINE ITEM</label>
                    </div>
                    <div className="actions-box">
                        {this.props.lineItemMode === 'showDetail' &&
                            <button type="button" className="btn btn-sm icon-plus" onClick={(e) => this.toggleLineItemMode(e, 'showAdd')}>
                                <i className="fas fa-plus"></i>
                            </button>
                        }
                        {this.props.lineItemMode === 'showAdd' &&
                            <button type="button" className="btn btn-sm icon-save" onClick={(e) => this.toggleLineItemMode(e, 'showDetail')}>
                                <i className="fas fa-save"></i>
                            </button>
                        }
                    </div>
                </div>     
                <div className="Item-Area">
                    {this.props.lineItemMode === 'showDetail' &&
                        <DetailComponent 
                            selectedOrder={this.props.selectedOrder || (this.props.orders && this.props.orders[0])}
                            RemoveLineItems={this.props.RemoveLineItems}
                            EditLineItems={this.props.EditLineItems}
                            UpdateLineUnits={this.props.UpdateLineUnits}
                            SaveLineUnits={this.props.SaveLineUnits}>
                        </DetailComponent>
                    }
                    {this.props.lineItemMode === 'showAdd' &&
                        <AddComponent 
                            lineItems={this.props.lineItems} 
                            searchLineItems={this.props.searchLineItems}
                            selectedLines = {this.props.selectedLines}
                            SelectLineItems = {this.props.SelectLineItems}
                            UnSelectLineItems = {this.props.UnSelectLineItems}>
                        </AddComponent>
                    }
                </div>
            </div>
        )
    }
}

export default LineItemComponent
