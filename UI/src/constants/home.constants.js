import API_URL from './app.constants'

const HOME_API_URL = API_URL

export const SEARCH_CUSTOMER = HOME_API_URL+'/customer/search/'
export const REQUEST_ORDER = HOME_API_URL+'/order/bycustomer/'
export const REQUEST_LINE_ITEMS = HOME_API_URL+'/product/byname/'
export const UPDATE_ORDER = HOME_API_URL+'/order'