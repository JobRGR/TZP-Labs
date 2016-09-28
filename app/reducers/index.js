import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import users from './users'

const rootReducer = combineReducers({
  user,
  users,
  routing
})

export default rootReducer