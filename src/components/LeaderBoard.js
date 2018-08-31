import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux'
import User from './Persona'

const LeaderBoard = props => {
    return (
        <div>
            {props.userIds.map((id) => {
                const { users } = props
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
                                <CardText>Answered Questions: {answers} </CardText>
                                <CardText>Created Questions: {questions} </CardText>
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

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        userIds: Object.keys(users).sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    }
}

export default connect(mapStateToProps)(LeaderBoard);

