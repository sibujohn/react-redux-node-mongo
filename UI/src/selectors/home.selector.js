import { createSelector } from 'reselect'

const getSearchText = state => state.searchText;
const getOrders = state => state.orders;
export const getFilteredList = createSelector(
    [getOrders, getSearchText],
    (orders, searchText) =>{
        if(orders){
            if(searchText){
              return orders.filter(order => order.ordernumber.toUpperCase().startsWith(searchText.toUpperCase()))
            }
            return orders;
        }
        return []
    }
)

const getSearchLine = state => state.searchLine;
const getLineItems = state => state.lineItems;
getFilteredLineList = () => {
    [getLineItems, getSearchLine],
    (lineItems, searchLine) =>{
        if(lineItems){
            if(searchLine){
                return lineItems.filter(line => line.uom.toUpperCase().startsWith(searchLine.toUpperCase()))
            }
            return lineItems;
        }
        return []
    }
}