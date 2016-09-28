import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText } from 'material-ui/Card'

class AboutPage extends Component {

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            title="About App"
          />
          <CardText>
            Author:
            Shehet Gregory IS-31<br />
            Ganzha Vladislav IS-31
          </CardText>

          <CardText>
            Individual task:
            The availability of capital and lowercase letters, numbers and punctuation marks.
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect()(AboutPage)
