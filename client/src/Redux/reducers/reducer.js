import { combineReducers } from 'redux'


import tokenReducer from './token'


const rootReducer = combineReducers({
  token: tokenReducer
})

export default rootReducer
