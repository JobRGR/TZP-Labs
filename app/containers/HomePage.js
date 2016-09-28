import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import Feed from './Feed'


class HomePage extends Component {

  render() {
    return this.props.user ? <Feed /> : <Auth />
  }
}

export default connect(store => store)(HomePage)
