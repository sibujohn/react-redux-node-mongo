import React from 'react'

class AddComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchLine : ""
    }
  }
  updateSearchLine = e =>{
    this.setState({
      searchLine:e.target.value
    })
  }
  triggerLineSearch = (e) =>{
    e.preventDefault();
    this.props.searchLineItems(this.state.searchLine)
  }
  toggleSelectLine = (event, item) =>{
    event.stopPropagation()
    if(!item.selected){
      this.props.SelectLineItems(this.props.selectedLines, item)
    }
    else{
      this.props.UnSelectLineItems(this.props.selectedLines, item)
    }
  }
  render(){
    return (
      <div className="full-height">
        <form className="search-box w-100" onSubmit={(e)=>this.triggerLineSearch(e)}>
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search here..." value={this.state.searchLine} onChange={this.updateSearchLine}/>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </form>
        <div className="add-list-elements">
          <ul className="list-group scroller">
            { this.props.lineItems && this.props.lineItems.map((item, index) =>
              <li className="list-group-item d-flex flex-row align-items-center" key={index} onClick={(e) => this.toggleSelectLine(e, item)}>
                <div className="check-box" >
                  { !item.selected && 
                    <i className="fas fa-square"></i>
                  }
                  { item.selected && 
                    <i className="fas fa-check-square"></i>
                  }
                  </div>
                  <div className="content-box">
                      <div className="item-name">
                          <label>Item Name: </label>
                          <span>{item.uom}</span>
                      </div>
                      <div className="item-description">
                          <label className="w-100"> 
                              Description:
                          </label>
                          <span className="text-justify">
                            {item.desc}
                          </span>
                      </div>
                  </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default AddComponent
