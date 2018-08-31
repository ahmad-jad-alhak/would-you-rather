import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleAnswer } from '../../actions/questions'
import User from '../Persona'
import {
  Card, Button, CardHeader, CardBody, CardText, CardTitle
} from 'reactstrap';

class Question extends Component {

  state = {
    vote: null,
    showDetails: false
  }

  onChange = e => {
    this.setState({ vote: e.target.name });
  }

  handleVote = (e) => {
    e.preventDefault();
    const { dispatch, id } = this.props;
    const option = this.state.vote;
    const info = { id, option };
    dispatch(handleAnswer(info));
    setTimeout(() => this.setState({
      showDetails: true
    }), 300);
  }

  render() {
    const { author, id, optionOne, optionTwo } = this.props.question
    const { avatarURL, name } = this.props.user
    const info = {
      author,
      avatarURL,
      name
    }

    return (
      <div className='card-style'>
        <Card>
          <CardHeader>{info.author} askes: </CardHeader>
          <CardBody>
            <CardTitle>Would you rather?</CardTitle>
            <CardText>
              Option one: {optionOne.text}
            </CardText>
            <CardText>
              Option Two: {optionTwo.text}
            </CardText>
            <User  {...info} />
            {this.props.hasVoted === "hasVoted" ?
              <Link to={ `/questions/${id}/details`}>
                <Button>Details</Button>
              </Link> 
              : <Link to={`/questions/${id}`}>
                  <Button>Vote</Button>
                </Link>}
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