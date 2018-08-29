
import React, { Component, Fragment } from 'react';
import {  NavLink } from 'react-router-dom'
import User from './Persona'
import { connect } from 'react-redux'
import { logOut } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
class Header extends Component {

    state = {
        logedIn: false
    }

    handlelogOut = () => {
        const { dispatch } = this.props
        dispatch(logOut())
        if (this.state.logedIn === false ) {
            return  <Redirect to="/" />
         }
    }
    render() {
 
        return (
            <header className="header">
                <h1 className="logo">{this.props.currUser !== null ? <User name={this.props.currUser}/> : '' }</h1>
                <ul className="nav">
                {this.props.currUser !== null ? 
                <Fragment>
                    <li>< NavLink exact to="/"  >Dashboard</NavLink></li>
                    <li>< NavLink exact to="/add" >New Question</NavLink></li>
                    <li>< NavLink exact to="/leaderboard" >Leader Board</NavLink></li>
                </Fragment> : ''}

                    <li onClick={this.handlelogOut}>< NavLink exact to="/" >{this.props.currUser !== null ? "Log Out" : "Log In" }</NavLink></li>
                </ul>
            </header>
        );
    }
}

export default connect()(Header); 
