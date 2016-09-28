import { SET_USER } from '../actions/user'

export default (state = null, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return action.user

    default:
      return state
  }
}