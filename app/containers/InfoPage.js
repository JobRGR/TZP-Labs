import React, { Component } from 'react'
import { connect } from 'react-redux'
import keypair from 'keypair'
import { encrypt, decrypt } from '../utils/crypto'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'

const pair = keypair();

class AboutPage extends Component {

  constructor() {
    super()
    this.state = {
      encrypt: true
    }
  }

  handleClick = () => this.setState(({encrypt}) => ({encrypt: !encrypt}))

  render() {
    const action = this.state.encrypt ? encrypt : text => text
    return (
      <Card>
        <CardTitle>
          Public Key:
        </CardTitle>
        <CardText>
          { action(pair.public) }
        </CardText>

        <CardTitle>
          Private Key:
        </CardTitle>
        <CardText>
          { action(pair.private) }
        </CardText>

        <CardTitle>
          Directory:
        </CardTitle>
        <CardText>
          { action(process.env.HOME) }
        </CardText>

        <CardTitle>
          Platfom:
        </CardTitle>
        <CardText>
          { action(process.platform) }
        </CardText>

        <CardTitle>
          Screen Width:
        </CardTitle>
        <CardText>
          { action(screen.width.toString() + 'px') }
        </CardText>

        <CardTitle>
          Screen Height:
        </CardTitle>
        <CardText>
          { action(screen.height.toString() + 'px') }
        </CardText>

        <CardText>
          <FlatButton secondary label={this.state.encrypt ? 'Decript' : 'Encript'}  onClick={ this.handleClick } />
        </CardText>
      </Card>
    )
  }
}

export default connect()(AboutPage)
