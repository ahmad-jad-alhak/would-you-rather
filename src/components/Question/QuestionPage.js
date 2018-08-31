import React, { Component } from 'react'
import { connect } from 'react-redux'
import Options from './Options'
import { Redirect } from 'react-router-dom'


class QuestionPage extends Component {
  state = {
    swtich: false
  }

  onClick = () => {
    this.setState({ switch: true });
  }

  render() {
    const { question } = this.props

    if (question === null ) {
      return <Redirect to="/404" />
    }

    return (
      <div className="card-style">
        <Options onClick={this.onClick} id={question.id} />
      </div>
    )
  }
}

function mapStateToProps({ questions }, { match }) {
  const question = questions[match.params.question_id]
  return {
    question: question ? question : null
  }
}

export default connect(mapStateToProps)(QuestionPage);