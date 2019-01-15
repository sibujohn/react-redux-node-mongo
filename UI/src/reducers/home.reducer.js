import { combineReducers } from 'redux'

const ComponentReducer = (state = { }, action) => {
    switch (action.type) {
      case "FETCH_ORDERS_SUCCESS":
        return {
          ...state,
          orders:action.orders, 
          selectedOrder:action.orders[0], 
          selectedLines:[]

        }
      case "FETCH_LINE_ITEMS_SUCCESS":
        return {
          ...state, lineItems:action.lineItems
        }
      case "UPDATE_ORDER_SUCCESS":
        let orders = state.orders;
        let updatedOrder = state.selectedOrder;
        let lines = state.lineItems.map(line => {
          line.selected = false;
          return line;
        })
        orders.map(item => {
          if(item.ordernumber === updatedOrder.ordernumber){
            item = updatedOrder
          }
          let orderLines = item.lineItems.map(i => {
            i.editMode = false;
            return i;
          })
          item.lineItems = orderLines;
          return item;
        })
        return {
          ...state,
          orders:orders, 
          selectedOrder:updatedOrder,
          lineItems:lines,
          selectedLines:[],
          lineItemMode:'showDetail'
        }   
      case "SELECT_ORDER":
        return {
          ...state,
          selectedOrder:action.order,
          selectedLines:[],
          lineItems:state.lineItems.map(line => {
            line.selected = false;
            return line;
          }),
          lineItemMode:'showDetail'
        }
      case "SEARCH_ORDER":
        return {
          ...state, searchText:action.searchText
        }
      case "SEARCH_LINE_ITEMS":
        return {
          ...state, searchLine:action.searchLine
        }
      case "TOGGLE_LINE_ITEM_MODE":
        return {
          ...state, lineItemMode:action.lineItemMode
        }   
      case "SELECT_LINE_ITEMS":
        let selectedItem = action.item;
        selectedItem.selected = true;
        return {
          ...state,
          selectedLines: [...state.selectedLines, selectedItem]
        }
      case "UNSELECT_LINE_ITEMS":
        let lineItems = state.lineItems.map(line => {
          if(line.productid === action.item.productid){
            line.selected = false;
          }
          return line;
        })
        return {
          ...state, lineItems : lineItems, selectedLines : state.selectedLines.filter(item => item.productid !== action.item.productid)
        }
      case "SAVE_LINE_ITEMS":
        return {
          ...state, selectedOrder:action.selectedOrder
        }
      case "EDIT_LINE_ITEMS":
        let editLineItems = state.selectedOrder.lineItems.map(item => {
          if(item.productid === action.item.productid){
            item.editMode = true;
          }
          return item;
        })
        return {
          ...state,
          selectedOrder: {
            ...state.selectedOrder, lineItems: editLineItems
          }
        }      
      case "UPDATE_LINE_UNITS":
        let updateLineItems = state.selectedOrder.lineItems.map(item => {
          if(item.productid === action.item.productid){
            item.unit = action.unit;
          }
          return item;
        })
        return {
          ...state,
          selectedOrder: {
            ...state.selectedOrder, lineItems: updateLineItems
          }
        }
      case "REMOVE_LINE_ITEMS":
        return {
          ...state, selectedOrder:action.selectedOrder
        }
      default:
        return state
    }
}

const HomeReducer = combineReducers({
  componentState : ComponentReducer,
})

export default HomeReducer