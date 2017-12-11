import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
    };
    this.viewUser = this.viewUser.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }
  viewUser(idR) {
    this.props.goUser(idR);
  }
  updateRating(newVal) {
    this.setState({
      rating: newVal.value
    });
  }
  render() {
    return (
      <div>
        <div className="section bgRecipe">
          <div className="recipeDescription">
            <div className="title1">{this.props.recipe.name}</div>
            <div onClick={() => { this.viewUser(this.props.recipe.userID) }} className="txt1">{this.props.recipe.username}</div>
            <div className="rating">{this.props.recipe.rating}
              <img src="/favorite.png" alt="" /></div>
            <select name="rating" value={this.state.rating} onChange={this.updateRating} ref="rating">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="3">2</option>
              <option value="3">1</option>
            </select><button>RATE</button>
          </div>
        </div>
        <div id="recipDesc" className="section autoH">
          <ul>
            INGREDIENTS
            {this.props.recipe.ingredients.map((ingridient) => {
              return (<li>
                {ingridient.name} - {ingridient.amount} {ingridient.type}
              </li>)
            })}
          </ul>
          <iframe
            src={this.props.recipe.video}>
          </iframe>
          <div className="description">
            <div className="txt1">{this.props.recipe.description}</div>
          </div>
        </div>
        <div className="newComment">
          <input type="text" placeholder="Write a new comment..." />
          <button>SEND</button>
        </div>
        <div className="comments">
          {this.props.recipe.comments.map((comment) => {
            <div className="comm">
              <div className="title1">{comment.user}</div>
              <div className="txt1">{comment.content}</div>
            </div>
          })}
        </div>

      </div>)
  }
}
RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
  goUser: PropTypes.func.isRequired,
};
