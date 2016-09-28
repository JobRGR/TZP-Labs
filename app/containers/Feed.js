import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import CheckBox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Done from 'material-ui/svg-icons/action/done'
import {green500 as green, grey500 as grey} from 'material-ui/styles/colors';
import read from '../utils/read'
import write from '../utils/write'
import { setUser } from '../actions/user'
import { setUsers, setDefaultUsers } from '../actions/users'


class Feed extends Component {

  constructor() {
    super()
    this.state = {
      open: false,
      index: 0,
      error: null
    }
  }

  componentWillMount() {
    this.props.dispatch(setDefaultUsers())
  }

  checkRule(password) {
    return (
      /[a-z]|[A-Z]/g.test(password) &&
      /[+*:/]/g.test(password)
    )

    // return (
    //   /[0-9]/g.test(password) &&
    //   /[a-z]/g.test(password) &&
    //   /[A-Z]/g.test(password) &&
    //   /[,!?]/g.test(password)
    // )
  }

  save() {
    const users = read()
    const user = users.find(({ name }) => name == this.props.user.name)
    const password = this.refs.newPassword.getValue()
    if (user.password != this.refs.password.getValue()) {
      return this.setState({error: "Wrong current password"})
    }
    else if (user.rule && !this.checkRule(password)) {
      return this.setState({error: "Rule is not correct"})
    }
    else {
      user.password = password
      write(users)
      this.props.dispatch(setUser(user))
      this.props.dispatch(setUsers(users))
      this.setState({error: "Success"})
    }
  }

  saveUsers() {
    const users = read()
    const user = users[this.state.index]
    user.password = this.refs.userNewPassword.getValue()
    user.active = this.refs.active.isChecked()
    user.rule = this.refs.rule.isChecked()
    write(users)
    this.props.dispatch(setUsers(users))
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            title={ 'Welcome ' + this.props.user.name }
          />

          <CardTitle
            title='Change Password'
          />
          <CardActions>
            <TextField
              ref='password'
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
            />
            <br />
            <TextField
              ref='newPassword'
              hintText="New Password Field"
              floatingLabelText="New Password"
              type="password"
            />
            <br />
            <FlatButton secondary label='Save'  onClick={ () => this.save() } />
          </CardActions>

          {
            this.props.user.admin &&
            <Table
              selectable={ false }
            >
              <TableHeader
                displaySelectAll={ false }
                adjustForCheckbox={ false }
              >
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Active</TableHeaderColumn>
                  <TableHeaderColumn>Rule</TableHeaderColumn>
                  <TableHeaderColumn>Edit</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={ false }>
                {
                  this.props.users
                    .map((user, index) =>
                      <TableRow key={user.name}>
                        <TableRowColumn>{ user.name }</TableRowColumn>
                        <TableRowColumn><Done color={ user.active ? green : grey }  /></TableRowColumn>
                        <TableRowColumn><Done color={ user.rule ? green : grey }  /></TableRowColumn>
                        <TableRowColumn>
                          <IconButton onTouchTap={ () => this.setState({open: true, index}) } >
                            <ModeEdit />
                          </IconButton>
                        </TableRowColumn>
                      </TableRow>
                    )
                }
              </TableBody>
            </Table>
          }

        </Card>


        <Dialog
          title="Change user"
          actions={ <FlatButton secondary label='Save'  onTouchTap={ () => this.saveUsers() } /> }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ () => this.setState({ open: false }) }
        >
          <TextField
            ref='userNewPassword'
            hintText="New User Password"
            floatingLabelText="New Password"
            defaultValue={ this.props.users[this.state.index].password }
            type="password"
          />
          <br />
          <CheckBox
            ref='active'
            defaultChecked={ this.props.users[this.state.index].active }
            label='User active'
          />
          <CheckBox
            ref='rule'
            defaultChecked={ this.props.users[this.state.index].rule }
            label='Use password rule'
          />
        </Dialog>

        <Snackbar
          open={this.state.error ? true : false}
          message={this.state.error || ''}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ error: false })}
        />
      </div>
    )
  }
}

export default connect(store => store)(Feed)
