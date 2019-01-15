import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import AppReducer from '../reducers/app.reducer'

const middleware = [ thunk ]
const AppStore = createStore(
    AppReducer,
    applyMiddleware(...middleware)
)

export default AppStore