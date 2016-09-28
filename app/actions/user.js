export const SET_USER = 'SET_USER'

export const setUser = user => {
  localStorage.user = JSON.stringify(user)
  return { type: SET_USER, user }
}
