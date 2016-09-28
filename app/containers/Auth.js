import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import { setUser } from '../actions/user'
import { setDefaultUsers } from '../actions/users'
import addUser from '../utils/addUser'
import read from '../utils/read'


class Auth extends Component {

  constructor() {
    super()
    this.state = {
      error: null
    }
  }

  go(page) {
    this.props.dispatch(push({
      page: '/',
      query: { page }
    }))
  }

  getData() {
    return {
      name: this.refs.name.getValue(),
      password: this.refs.password.getValue()
    }
  }

  signIn = data => {
    const content = read()
    const user = content.find(({ name }) => name == data.name)
    if (!data.name) {
      this.setState({error: 'Name required'})
    }
    else if (!user) {
      this.setState({error: 'No user has such name'})
    }
    else if (!user.active) {
      this.setState({error: 'User is not active'})
    }
    else if (user.password != data.password) {
      this.setState({error: 'Wrong password'})
    }
    else {
      this.props.dispatch(setUser(user))
    }
  }

  signUp = data => {
    const content = read()
    const user = content.find(({ name }) => name == data.name)
    if (!data.name) {
      this.setState({error: 'Name required'})
    }
    else if (!data.password) {
      this.setState({error: 'Password required'})
    }
    else if (user) {
      this.setState({error: 'User with such name already exists'})
    }
    else {
      addUser(data.name, data.password)
      this.props.dispatch(setUser({
        name: data.name,
        password: data.password,
        admin: false,
        action: true
      }))

      this.props.dispatch(setDefaultUsers())
    }
  }

  render() {
    const sigin = 'sigin'
    const signup = 'signup'
    const { page } = this.props.routing.locationBeforeTransitions.query

    const pageName = page == sigin ? "Sigin In" : "Sigin Up"
    const action = page == sigin ? this.signIn : this.signUp
    return (
      <div>
        <Card>
          <CardTitle
            title="Welcome in App"
            subtitle="Choose authorisation strategy"
          />

          <CardActions>
            <FlatButton primary label="Sign In" onClick={ () => this.go(sigin) } />
            <FlatButton primary label="Sign Up" onClick={ () => this.go(signup) } />
          </CardActions>

          {
            (page == sigin || page == signup) &&
            <CardText>
              <CardTitle
                title={ pageName }
              />
              <TextField
                ref='name'
                hintText="Name Field"
                floatingLabelText="Name"
                type="text"
              />
              <br />
              <TextField
                ref='password'
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
              />
              <br />
              <FlatButton secondary label={ pageName } onClick={ () => action(this.getData()) } />
            </CardText>
          }

        </Card>

        <Snackbar
          open={this.state.error ? true : false}
          message={this.state.error || ''}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ error: null })}
        />
      </div>
    )
  }
}

export default connect(store => store)(Auth)
