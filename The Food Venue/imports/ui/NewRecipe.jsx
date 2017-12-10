import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      formError: '',
      selectedUser: {},
    };

  }

  renderNewRecipe() {
    if (this.state.ingredients.length > 0) {
      return this.state.ingredients.map((ingredient, key) => {
        return (<div className="">
          <b>Name:</b> {ingredient.name}  &nbsp;
          <b>Amount:</b> {ingredient.amount} s  &nbsp;
          <b>Type:</b>{ingredient.type}
          <button aria-label="Delete ingredient from recipe" type="button" onClick={() => this.deleteIngredient(key)}>DELETE</button>
        </div>)
      });
    }
    return (<div> <br /> Add some ingredients to your recipe! </div>);
  }

  addExercise() {
    const name = ReactDOM.findDOMNode(this.refs.ingredientName).value.trim();
    const type = ReactDOM.findDOMNode(this.refs.ingredientUnits).value.trim();
    const amount = ReactDOM.findDOMNode(this.refs.ingredientAmount).value.trim();
    
    if (name !== '' && type !== ''  && (amount !== '' && amount > 0) ) {
      const newIngredient = {
        name,
        type,
        amount,
      };
      const updateIngredients = this.state.ingredients;
      updateIngredients.push(newIngredient);
      this.setState({
        ingredients: updateIngredients,
        formError: '',
      });
    } else {
      if (name === '') {
        this.setState({
          formError: 'Name your ingredient!',
        });
      }
      else if (type === '') {
        this.setState({
          formError: 'Your recipe needs units!',
        });
      }
      else if (amount < 1) {
        this.setState({
          formError: 'Amount of ingredient must be 1 or more!',
        });
      }
    }
  }

  deleteIngredient(key) {
    const updateIngredients = this.state.ingredients;
    updateIngredients.splice(key, 1);
    this.setState({
      ingredients: updateIngredients,
      formError: '',
    });
  }
  addRecipe() {
    const name = ReactDOM.findDOMNode(this.refs.recipeName).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.recipeDescription).value.trim();
    const process = ReactDOM.findDOMNode(this.refs.recipeProcess).value.trim();
    const video = ReactDOM.findDOMNode(this.refs.recipeVideo).value.trim();
    Meteor.call('recipes.insert', name, description, process,video, this.state.ingredients);
  }


  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const newRecipeClassName = classnames({
      //checked: this.props.task.checked,
      //private: this.props.task.private,
    });

    return (
      <div>
        New Recipe
          <form onSubmit={this.addRecipe.bind(this)}>
          <label for="name">Name: </label><input name="name" type="text" ref="recipeName" aria-label="Recipe name" required />
          <br />
          <label for="description">Description: </label><input name="description" type="text" ref="recipeDescription" aria-label="Recipe description" required />
          <br />
          <label for="process">Process: </label><input name="process" type="text" ref="recipeProcess" aria-label="Recipe process cook" required />
          <br />
          <label for="urlVideo">Video url: </label><input name="urlVideo" type="text" ref="recipeVideo" aria-label="Recipe video url" required />
          <br />

          {this.renderNewRecipe()}
          <div>

            <label for="ingredientName">Name</label><input
              required
              name="ingredientName"
              type="text"
              ref="ingredientName"
              aria-label="Name of your ingredient"
              placeholder="The name of your ingredient"
            /> <br />

            <select required
              name="type"
              ref="ingredientUnits"
              aria-label="Ingredient units">
              <option value="cup">Cup</option>
              <option value="kg">Kg</option>
              <option value="spoon">Spoon</option>
              <option value="glass">Glass</option>
            </select>
            <br />

            <label for="amount">Amount</label><input
              required
              name="ingredientAmount"
              type="number"
              min="1"
              ref="ingredientAmount"
              aria-label="Ingredient amount"
              placeholder="Ingredient amount"
            />
          </div>
          <span className="error">{this.state.formError}</span>
          <button
            aria-label="Add an ingredient to your recipe"
            type="button"
            onClick={this.addIngredient.bind(this)}>
            Add ingredient
          </button>

          {this.state.ingredients.length ? <button aria-label="Add a new recipe" >ADD RECIPE</button> : ''}
        </form>
      </div>

    );
  }
}

NewRecipe.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  //task: PropTypes.object.isRequired,
  //showPrivateButton: React.PropTypes.bool.isRequired,
};
