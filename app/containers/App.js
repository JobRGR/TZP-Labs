import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setUser } from '../actions/user'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import quite from '../utils/removePublic'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  navigate = pathname => {
    this.props.dispatch(push(pathname))
    this.handleClose()
  }

  render() {
    return (
      <div>
        <AppBar
          title='App'
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            this.props.user
            ? <FlatButton label='Logout' onClick={ () => this.props.dispatch(setUser(null)) } />
            : <div />
          }
        />


        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={() => this.navigate('/')}>Home</MenuItem>
          <MenuItem onTouchTap={() => this.navigate('/about')}>About</MenuItem>
          <MenuItem onTouchTap={() => this.navigate('/info')}>Info</MenuItem>
          <MenuItem onTouchTap={ () => quite() }>Quite</MenuItem>
        </Drawer>


        {this.props.children}
      </div>
    )
  }
}

export default connect(store => store)(App)
