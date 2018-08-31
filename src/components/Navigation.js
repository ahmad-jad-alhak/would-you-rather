
import React, { Component, Fragment } from 'react';
import {  NavLink } from 'react-router-dom'
import User from './Persona'
import { connect } from 'react-redux'
import { logOut } from '../actions/authedUser'

class Header extends Component {

    state = {
        logedIn: false
    }

    handlelogOut = () => {
        const { dispatch } = this.props
        dispatch(logOut())
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
                    <li onClick={this.handlelogOut}><a herf="#" style={{color: '#fff'}}>{this.props.currUser !== null ? "Log Out" : "Log In" }</a></li>
                </ul>
            </header>
        );
    }
}

export default connect()(Header); 
