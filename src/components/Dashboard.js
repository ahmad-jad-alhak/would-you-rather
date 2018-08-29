
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question/Question';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    state = {
        filter: true,
    }

    filterUnanswered = () => {
        this.setState({ filter: true })
    }

    filterAnswered = () => {
        this.setState({ filter: false })
    }


    render() {
        if (this.state.logedIn === false ) {
            return  <Redirect to="/" />
         }

        return (
            <div className="container" style={{ marginTop: '30px' }}>
                <div className="filter-div">
                    <Button onClick={this.filterUnanswered}>Unanswered</Button>
                    <Button  onClick={this.filterAnswered}>Answered</Button>
                </div>
                {this.state.filter ? (
                    <div> {this.props.unAnsweredQuestionIds
                        .map((id) => {
                            return <Question key={id} id={id} />
                        })
                    }
                    </div>
                ) : (
                        <div> {this.props.answeredQuestionIds
                            .map((id) => {
                                return <Question hasVoted="hasVoted" filter={true} key={id} id={id} />
                            })
                        }
                        </div>
                    )}

            </div>
        )

    }
}

function mapStateToProps({ questions, authedUser }) {
    const unAnsweredQuestions = Object.values(questions).filter((question) =>
        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))

    const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    )

    return {
        unAnsweredQuestionIds: Object.values(unAnsweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        answeredQuestionIds: Object.values(answeredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
    }
}

export default connect(mapStateToProps)(Dashboard);

/* 
 */