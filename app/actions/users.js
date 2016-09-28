import read from '../utils/read'

export const SET_USERS = 'SET_USERS'

export const setDefaultUsers = () => {
  const users = read()
  return { type: SET_USERS, users }
}


export const setUsers = users => ({ type: SET_USERS, users })
