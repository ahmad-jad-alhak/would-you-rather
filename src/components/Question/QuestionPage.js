import React, { Component } from 'react'
import { connect } from 'react-redux'
import Options from './Options'



class QuestionPage extends Component {
  state = {
    swtich: false
  }

  onClick = () => {
    this.setState({ switch: true });
  }

  render() {
    const { question} = this.props


    if (question === null) {
      return <p>This Tweet doesn't exist.</p>
    }

    return (
      <div className="card-style">
        <Options onClick={this.onClick} id={question.id} />
      </div>
    )
  }
}

function mapStateToProps({ questions }, { match }) {
  const question = questions[match.params.id]
  return {
    question,
  }
}

export default connect(mapStateToProps)(QuestionPage);