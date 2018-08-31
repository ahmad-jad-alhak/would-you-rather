import React, { Component, Fragment } from 'react';
import '../App.css';
import '../style.scss';
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared';
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import Login from './LoginPage'
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewQuestion from './Question/AddQuestion'
import LeaderBoard from './LeaderBoard'
import QuestionPage from './Question/QuestionPage'
import Details from './Question/Details'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Navigation currUser={this.props.authedUser} />
          <div className="App">
            {this.props.loading  ?
              <Switch>
                <Route path="/" component={Login} />
              </Switch>
              :
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:question_id/details" component={Details} />
                <Route path="/questions/:question_id" exact component={QuestionPage} />
                <Route path="/add" component={() => <NewQuestion />} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/login" exact component={Login} />
                <Route component={NotFound} />
              </Switch>
            }
          </div>
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App);
