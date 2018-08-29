import React, { Component } from 'react'
import {
    Card, CardBody,
    CardTitle, CardText, Progress
} from 'reactstrap';
import { connect } from 'react-redux'
import User from './Persona'
import {  Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    render() {
        if (this.props.authedUser === null) {
            return <Redirect to="/" />
        }
        return (
            <div>
                {this.props.userIds.map((id) => {
                    const { users } = this.props
                    const user = users[id]
                    const questions = user.questions.length
                    const answers = Object.keys(user.answers).length
                    const score = answers + questions
                    return (
                        <Card key={id} className="card-style">
                            <CardBody style={{ display: 'flex' }}>
                                <div style={{ width: '30%' }}>
                                    <User name={user.name} />
                                </div>
                                <div style={{ width: '50%' }}>
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardText>Answered Questions: {questions} </CardText>
                                    <CardText>Created Questions: {answers} </CardText>
                                </div>
                                <div style={{ width: '15%' }}>
                                    Score: {score}
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        userIds: Object.keys(users).sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    }
}

export default connect(mapStateToProps)(LeaderBoard);

