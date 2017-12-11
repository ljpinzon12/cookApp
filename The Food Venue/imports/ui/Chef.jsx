import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Chef extends Component {

  render() {
    return (
      <div className="recipe">
      </div>
    );
  }
}

Chef.propTypes = {
  chef_id: PropTypes.object.isRequired,
};
