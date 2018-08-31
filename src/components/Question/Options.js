import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../../actions/questions'
import User from '../Persona'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import { FormGroup, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class Question extends Component {

  state = {
    showDetails: false
  }

  handleVote = (e) => {
    const { dispatch, id } = this.props;
    const option = e.target.name;
    const info = { id, option };
    dispatch(handleAnswer(info));
    setTimeout(() => this.setState({
      showDetails: true
    }), 300);
    this.props.onClick()
  }

  render() {
    const { author, id, optionOne, optionTwo } = this.props.question
    const { avatarURL, name } = this.props.user
    const info = {
      author,
      avatarURL,
      name
    }

    if (this.state.showDetails === true) {
      return <Redirect to={`/questions/${id}/details`} />;
    }

    return (
      <div className='card-style'>
        <Card>
          <CardHeader>{info.author} askes: </CardHeader>
          <CardBody>
            <FormGroup tag="fieldset">
              <legend>Would you rather?</legend>
              <FormGroup check>
                <Label check>
                  Option one: {optionOne.text}
                </Label>
              </FormGroup>
                <Button onClick={this.handleVote} name="optionOne" >Vote</Button>
              <FormGroup check>
                <Label check>
                  Option Two: {optionTwo.text}
                </Label>
              </FormGroup>
                <Button onClick={this.handleVote} name="optionTwo" >Vote</Button>
            </FormGroup>
            <User  {...info} />
          </CardBody>
        </Card>
      </div>
    )
  }
}



function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id]
  const user = users[question.author]
  return {
    question,
    user,
    authedUser,
  }
}


export default connect(mapStateToProps)(Question);