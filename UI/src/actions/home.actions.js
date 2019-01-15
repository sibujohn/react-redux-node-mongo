import { Http_Get, Http_Post } from '../utils/app.apis'
import { REQUEST_ORDER, REQUEST_LINE_ITEMS, UPDATE_ORDER } from '../constants/home.constants'

export const RequestOrders = dispatch => {
  return () => {
    dispatch ({
      type:"FETCH_ORDERS"
    })
    Http_Get(REQUEST_ORDER)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"FETCH_ORDERS_SUCCESS",
        orders : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"FETCH_ORDERS_FAILURE",
        error : "Error Message"
      })
    });
  }
}

export const RequestLineItems = dispatch => {
  return () => {
    dispatch ({
      type:"FETCH_LINE_ITEMS"
    })
    Http_Get(REQUEST_LINE_ITEMS)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"FETCH_LINE_ITEMS_SUCCESS",
        lineItems : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"FETCH_LINE_ITEMS_FAILURE",
        error : "Error Message"
      })
    });
  }
}

export const SelectOrder = dispatch => {
  return order => {
    dispatch ({
      type:"SELECT_ORDER",
      order : order
    })
  }
}

export const ToggleLineItemMode = dispatch => {
  return lineItemMode => {
    dispatch ({
      type:"TOGGLE_LINE_ITEM_MODE",
      lineItemMode : lineItemMode
    })
  }
}

export const SearchOrder = dispatch => {
  return searchText => {
    dispatch ({
      type:"SEARCH_ORDER",
      searchText : searchText
    })
  }
}

export const SearchLineItems = dispatch => {
  return searchLine => {
    dispatch ({
      type:"SEARCH_LINE_ITEMS",
      searchLine : searchLine
    })
  }
}

export const SelectLineItems = dispatch => {
  return (selectedLines, item) => {
    dispatch ({
      type:"SELECT_LINE_ITEMS",
      selectedLines: selectedLines,
      item : item
    })
  }
}

export const UnSelectLineItems = dispatch => {
  return (selectedLines, item) => {
    dispatch ({
      type:"UNSELECT_LINE_ITEMS",
      selectedLines: selectedLines,
      item : item
    })
  }
}

export const EditLineItems = dispatch => {
  return (item) => {
    dispatch ({
      type:"EDIT_LINE_ITEMS",
      item : item
    })
  }
}

export const UpdateLineUnits = dispatch => {
  return (unit, item) => {
    dispatch ({
      type:"UPDATE_LINE_UNITS",
      unit : unit,
      item : item
    })
  }
}

export const SaveLineItems = dispatch => {
  return (selectedOrder, selectedLines) => {
    let lineItems = selectedOrder.lineItems.concat(selectedLines);
    selectedOrder.lineItems = lineItems;
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Post(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    });
  }
}

export const SaveLineUnits = dispatch => {
  return (selectedOrder, item) => {
    selectedOrder.lineItems = selectedOrder.lineItems.map(line => {
      if(line.productid === item.productid){
        line = item
      }
      return line;
    });
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Post(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    });
  }
}

export const RemoveLineItems = dispatch => {
  return (selectedOrder, item) => {
    selectedOrder.lineItems = selectedOrder.lineItems.filter(line => {
      return line.productid !== item.productid
    });
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Post(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    });
  }
}