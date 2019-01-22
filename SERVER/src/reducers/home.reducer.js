import { combineReducers } from 'redux'

const initialState = {
  searchText: '',
  customers: [],
  selectedCustomer:null,
  orders:[],
  orderOptions: {
    skip:0,
    limit:20,
    records:0,
    sortby:"date",
    sorthow:"desc",
    loading:false
  },
  selectedOrder:null,
  lineItems:{},
  lineItemMode:false,
  selectedLines:[]
};

const formatDate = (date) => {
  let dt = date.substring(0,10).split("-")
  return dt[1]+"-"+dt[2]+"-"+dt[0]
}

const ComponentReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SEARCH_CUSTOMER_SUCCESS":
        return {
          ...state,
          customers:action.customers
        }
      case "UPDATE_CUSTOMER_VALUE":
        return {
          ...state,
          searchText: action.searchText
        };
      case "CLEAR_CUSTOMERS":
        return {
          ...state,
          customers: []
        };

      case "'UPDATE_CUSTOMERS":
        if (action.searchText !== state.searchText) {
          return {
            ...state
          };
        }
        return {
          ...state,
          customers: action.customers
        };
      case "CUSTOMER_SELECTED":
        return {
          ...state,
          orders : [],
          orderOptions : {
            skip:0,
            limit:20,
            records:0,
            sortby:"date",
            sorthow:"desc",
            loading:false
          },
          selectedCustomer:action.selectedCustomer,
          selectedLines : []
        }
      case "FETCH_ORDERS_SUCCESS":
        let orderOptions = action.orderOptions
        orderOptions.records = action.orders.total
        orderOptions.loading = false
        let orderList = action.orders.docs.map(i => {
          i.formattedDate = formatDate(i.date)
          return i;
        })
        if(orderOptions.skip === 0){
          state.orders = []
        }
        orderList = state.orders.concat(orderList)
        return {
          ...state,
          orders:orderList, 
          selectedOrder:(action.selectedOrder) ? action.selectedOrder : action.orders.docs[0], 
          orderOptions:orderOptions
        }
      case "UPDATE_ORDER_OPTIONS":
        let orderOption = action.orderOptions
        if(action.mode === 'lazy'){
          orderOption.skip = action.showSpan
        }
        else if(action.mode === 'sort'){
          orderOption.sortby = action.sortParam.sortby
          orderOption.sorthow = action.sortParam.sorthow
          orderOption.skip = 0
        }
        orderOption.loading = true;
        return {
          ...state,
          orderOptions:orderOption
        }
      case "FETCH_LINE_ITEMS_SUCCESS":
        return {
          ...state, lineItems:action.lineItems
        }
      case "UPDATE_ORDER_SUCCESS":
        let orders = state.orders
        let updatedOrder = state.selectedOrder
        orders.map(item => {
          if(item.ordernumber === updatedOrder.ordernumber){
            item = updatedOrder
          }
          let orderLines = item.lineItems.map(i => {
            i.editMode = false
            return i
          })
          item.lineItems = orderLines
          return item
        })
        return {
          ...state,
          orders:orders, 
          selectedOrder:updatedOrder,
          selectedLines:[],
          lineItemMode:false
        }   
      case "SELECT_ORDER":
        return {
          ...state,
          selectedOrder:action.order,
          selectedLines:[]
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
        return {
          ...state, selectedLines:action.item
        }
      case "UNSELECT_LINE_ITEMS":
        let lineItems = state.lineItems.map(line => {
          if(line.productId === action.item.productId){
            line.selected = false
          }
          return line
        })
        return {
          ...state, lineItems : lineItems, selectedLines : state.selectedLines.filter(item => item.productId !== action.item.productId)
        }
      case "SAVE_LINE_ITEMS":
        return {
          ...state, selectedOrder:action.selectedOrder
        }
      case "EDIT_LINE_ITEMS":
        let editLineItems = state.selectedOrder.lineItems.map(item => {
          if(item.productId === action.item.productId){
            item.editMode = true
          }
          return item
        })
        return {
          ...state,
          selectedOrder: {
            ...state.selectedOrder, lineItems: editLineItems
          }
        }      
      case "UPDATE_LINE_UNITS":
        let updateLineItems = state.selectedOrder.lineItems.map(item => {
          if(item.productId === action.item.productId){
            item.unit = action.unit
          }
          return item
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