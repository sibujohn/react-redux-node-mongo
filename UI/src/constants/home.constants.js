import API_URL from './app.constants';

const HOME_API_URL = API_URL+'/userlist'

export const REQUEST_ORDER = HOME_API_URL+'/list';
export const REQUEST_LINE_ITEMS = HOME_API_URL+'/linelist';
export const UPDATE_ORDER = HOME_API_URL+'/update';