import React from 'react';
import {
    Card, CardBody,
    CardTitle, Progress, Alert
} from 'reactstrap';
import User from '../Persona'
import {  connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Details = (props) => {
    const { question, authedUser, usersNum, user } = props

    if (props.authedUser === null ) {
        return <Redirect to="/" />
    } 

    return (
        <div className='card-style'>
            <Card>
                <CardBody >
                    <div style={{ width: '36%', display: 'inline-block' }}>
                        <User avatarURL={user.avatarURL} name={user.name} />
                    </div>
                    <div style={{ width: '60%', display: 'inline-block' }}>
                        <QuestionCard users={usersNum} q={question.optionOne} authedUser={authedUser} />
                        <QuestionCard users={usersNum} q={question.optionTwo} authedUser={authedUser} />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

const QuestionCard = (props) => {
    return (
        <div>
            <Card body>
                <CardTitle>{props.q.text}</CardTitle>
                <div className="text-center">{props.q.votes.length} of {props.users}</div>
                <Progress value={props.q.votes.length} max={props.users} />
                <div style={{ margin: '16px'}}> {props.q.votes.includes(props.authedUser) && 
                    <Alert color="success">
                        You voted for this answer!
                    </Alert>}
                </div>
            </Card>
        </div>
    );
};

function mapStatToProps({ users, authedUser, questions }, { match }) {
    const question = questions[match.params.id]
    const usersNum = Object.keys(users).length
    const user = users[question.author]

    return {
        users,
        authedUser,
        question,
        usersNum,
        user
    }
}

export default connect(mapStatToProps)(Details);

