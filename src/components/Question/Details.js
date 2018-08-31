import React from 'react';
import {
    Card, CardBody,
    CardTitle, Progress, Alert
} from 'reactstrap';
import User from '../Persona'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const  Details = (props) => {

    if (props.question === null) {
        return <Redirect to="/NotFound" />
    }
    
    const { question, authedUser, usersNum, users } = props
    const voters = question.optionOne.votes.length + question.optionTwo.votes.length;
    const countOptionOneVoters = question.optionOne.votes.length
    const countOptionTwoVoters = question.optionTwo.votes.length
    const optionOnePercent = parseInt(100 * (countOptionOneVoters / voters), 10);
    const optionTwoPercent = parseInt(100 * (countOptionTwoVoters / voters), 10);
    const user = users[question.author]
    
    return (
        <div className='card-style'>
            <Card>
                <CardBody >
                    <div style={{ width: '36%', display: 'inline-block' }}>
                        <User avatarURL={user.avatarURL} name={user.name} />
                    </div>
                    <div style={{ width: '60%', display: 'inline-block' }}>
                        <QuestionCard 
                            zahl={optionOnePercent} 
                            users={usersNum} 
                            q={question.optionOne}  
                            votes={countOptionOneVoters} 
                            authedUser={authedUser} />
                        <QuestionCard 
                            zahl={optionTwoPercent} 
                            users={usersNum} 
                            q={question.optionTwo} 
                            votes={countOptionTwoVoters} 
                            authedUser={authedUser} />
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
                <div className="text-center">{props.zahl}%</div>
                <Progress value={props.zahl} />
                <p>{props.votes === 0 ? "No votes for this option yet" : `${props.votes} voted for this option`}</p>
                <div style={{ margin: '16px' }}> {props.q.votes.includes(props.authedUser) &&
                    <Alert color="success">
                        You voted for this answer!
                    </Alert>}
                </div>
            </Card>
        </div>
    );
};

function mapStatToProps({ users, authedUser, questions }, { match }) {
    const question = questions[match.params.question_id] 
    const usersNum = Object.keys(users).length
    return {
        users,
        authedUser,
        question: question ? question : null,
        usersNum,
    }
}

export default connect(mapStatToProps)(Details);
