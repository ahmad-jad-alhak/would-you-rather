import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../../actions/questions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionOneText: '',
            optionTwoText: '',
            toHome: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInput = e => {
        const text = e.target.value
        const property = e.target.name
        this.setState({
            [property]: text
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props;
        dispatch(handleAddQuestion(optionOneText, optionTwoText))
        this.setState({ optionOneText: '', optionTwoText: '', toHome: true })
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state;

        if (this.props.authedUser === null) {
            return <Redirect to='/' />
        }

        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className="container-page">
                <h3>Add a new question</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleText">Option One</Label>
                        <Input type="textarea" name="optionOneText" id="exampleText" value={optionOneText}
                            onChange={this.handleInput} />
                        <Label for="exampleText">Option Two</Label>
                        <Input type="textarea" name="optionTwoText" id="exampleText" value={optionTwoText}
                            onChange={this.handleInput} />
                    </FormGroup>
                    <Button style={{ background: '#5fcf80', color: '#fff', width: '200px', margin: 'auto' }}>Submit</Button>
                </Form>
            </div>
        )
    }
}


export default connect()(NewQuestion);
