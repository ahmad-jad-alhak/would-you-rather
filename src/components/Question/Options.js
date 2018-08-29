import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../../utils/_DATA'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../../actions/questions'
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType
} from 'office-ui-fabric-react/lib/DocumentCard';
import User from '../Persona'
import {
  Card, Button, CardHeader, CardBody,

} from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class Question extends Component {

  state = {
    vote: null,
    showDetails: false
  }

  onChange = e => {
    this.setState({ vote: e.target.name })
  }

  handleVote = (e) => {
    e.preventDefault();
    const { dispatch, id } = this.props;
    const option = this.state.vote;
    const info = { id, option };
    dispatch(handleAnswer(info));
    setTimeout(() => this.setState({
      showDetails: true
    }), 500);
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
      return <Redirect to={`/question/${id}/details`} />;
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
                  <Input type="radio" name="optionOne" onClick={this.onChange} />
                  Option one: {optionOne.text}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="optionTwo" onClick={this.onChange} />
                  Option Two: {optionTwo.text}
                </Label>
              </FormGroup>
            </FormGroup>
            <User  {...info} />
            <Button onClick={this.handleVote} name="optionOne">Vote</Button>
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