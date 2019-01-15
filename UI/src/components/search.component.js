import React from 'react'

class SearchComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search : ""
    }
  }
  handleChange = e =>{
    this.setState({
      search:e.target.value
    })
  }
  triggerSearch = (e) =>{
    e.preventDefault();
    this.props.searchOrder(this.state.search)
  }
  render(){
    return (
      <div className="tools-box w-50 mr-4 d-flex flex-row align-items-center">
        <form className="search-box" onSubmit={(e)=>this.triggerSearch(e)}>
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search here..." value={this.state.search} onChange={this.handleChange}/>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </form>
        <div className="user-box ml-4">
            <span className="user-avathar-link">
                <img alt="" className="user-avathar img img-fluid" src="./images/a5.png"/>
            </span>
        </div>
      </div>
    )
  }
}

export default SearchComponent
