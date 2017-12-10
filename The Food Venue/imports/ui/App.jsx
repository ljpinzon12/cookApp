import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Landing from './Landing.jsx';
import NewRecipe from './NewRecipe.jsx';

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

  render() {
    return (
      <div className="container">
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
        {true ? console.log(this.state.currentPage === 'Landing') : ''}
        {this.state.currentPage === 'Landing' ?  <Landing /> : ''}
        {this.state.currentPage === 'CreateRecipe' ?  <NewRecipe /> : ''}
        <div className="footer">
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
