import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/configureStore'
import routes from './routes'
import { setUser } from './actions/user'
import { setDefaultUsers } from './actions/users'
import checkWrite from './utils/checkWrite'


const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
const muiTheme = getMuiTheme()

injectTapEventPlugin()
checkWrite()

store.dispatch(setUser(localStorage.user != 'undefined' ? JSON.parse(localStorage.user || null) : null))
store.dispatch(setDefaultUsers())

render(
  <MuiThemeProvider muiTheme = {muiTheme}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider> ,
  document.getElementById('root')
)
