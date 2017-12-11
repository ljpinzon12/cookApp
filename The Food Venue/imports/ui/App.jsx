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
import Recipe from './Recipe.jsx';
import NewUser from './NewUser.jsx';
import Profile from './Profile.jsx';

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
  toggleShowRecipes() {
    this.setState({
      currentPage: 'Recipes',
    });
  }
  renderRecipes() {
    let i = 0;
    return this.props.recipes.map((recipe) => {
      i++;
      return (
        <Recipe key={recipe._id} recipe={recipe} num={i}/>
      );
    })
  }
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }
  toggleMyProfile() {
    this.setState({
      currentPage: 'Profile',
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
            <button aria-label="Search a recipe" onClick={this.toggleShowRecipes.bind(this)}>SEE ALL RECIPES</button>
            { this.props.currentUser ? <button aria-label="Add a new recipe"  onClick={this.toggleCreateRecipe.bind(this)}>ADD RECIPE</button> <button aria-label="See my profile"  onClick={this.toggleMyProfile.bind(this)}>MY PROFILE</button> : '' }
            <AccountsUIWrapper />
          </div>
        </header>
        {this.state.currentPage === 'Landing' ?  <Landing /> : ''}
        {this.state.currentPage === 'CreateRecipe' ?  <NewRecipe /> : ''}
        {this.state.currentPage === 'Recipes' ?  this.renderRecipes.bind(this) : ''}
        {!this.props.user && this.props.currentUser ? <NewUser /> : ''}
        {this.state.currentPage === 'Profile' ?  <Profile /> : ''}
        <div className="footer">
          <span>
            2017 The Food Venue. Sas Zero rights reserved. The Food Venue is not a registered service mark of The Food Venue. Sas.
          </span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
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
