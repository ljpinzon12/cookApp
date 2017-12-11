import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class RecipeDetail extends Component {

  render() {
    return (
    <div>
      {console.log(this.props.recipe)}
      Hola
    </div> )
  }
}
RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
};
