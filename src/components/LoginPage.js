import React, { Component } from 'react'
import { handleSetAuthUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currUser: null,

    }
    this.login = this.login.bind(this)
  }

  login = (event) => {
    this.setState({ currUser: event.target.value })
  }

  onLogin = () => {
    const { dispatch } = this.props;
    dispatch(handleSetAuthUser(this.state.currUser));
    if (this.state.currUser !== null) {
      return <Redirect to='/' />
    }
  }

  render() {

    return (
      <div className="container-page">
        <h3>Welcome to the Would you Rather App!</h3>
        <p>Please choose a user to login </p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect" defaultValue='default' onChange={this.login}   >
              <option
                disabled
                value='default'>
                Choose user
                  </option>
              {Object.keys(this.props.users).map(user => (
                <option
                  key={this.props.users[user].id}
                  value={this.props.users[user].id}>
                  {this.props.users[user].name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button style={{ background: '#5fcf80', color: '#fff', width: '200px', margin: 'auto' }} onClick={this.onLogin}>Submit</Button>
        </Form>
      </div>
    )
  }
}


function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login);