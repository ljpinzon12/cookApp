import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import{Chefs} from '../api/chef.js'


import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Landing from './Landing.jsx';
import NewRecipe from './NewRecipe.jsx';
import NewUser from './NewUser.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Landing',
    };
  }
  toggleCreateRecipe() {
    this.setState({
      currentPage: 'CreateRecipe',
    });
  }
  incompleteUser() {
    if (this.state.currentPage != 'incompleteUser') {
      if (!this.props.user && this.props.currentUser) {
        this.setState({
          currentPage: 'incompleteUser',
        });
      }
    }
  }
  render() {
    return (
      <div className="container">
        {this.incompleteUser() ? '' : ''}
        <header>
          <div className="navbar">
            <img src="logo.svg" alt="" />
            <div className="navTitle"> 
              the food venue
            </div>
            <button aria-label="Add a new routine"  className="textBtn" onClick={this.toggleCreateRecipe.bind(this)}>ADD ROUTINE</button>
            <input type="text" placeholder="Search..." />
            <AccountsUIWrapper />
          </div>
        </header>
        {this.state.currentPage === 'Landing' ?  <Landing /> : ''}
        {this.state.currentPage === 'CreateRecipe' ?  <NewRecipe /> : ''}
        {this.state.currentPage === 'incompleteUser'? <NewUser /> : ''}
        <div className="footer">
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user:PropTypes.object,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('chefs');
  Meteor.subscribe('recipes');
  if (Meteor.user()) {
    
    return {
      user: Chefs.findOne({userID: Meteor.user()._id }),
      currentUser: Meteor.user(),
    }
  } else {
    return {
      currentUser: Meteor.user(),

    }
  }
}, App);
