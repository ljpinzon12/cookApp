import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Recipes } from '../api/recipe.js';

// Task component - represents a single todo item
export default class Chef extends Component {

    constructor(props) {
        super(props);

    }

    isFollowing() {

        for ( i = 0; i < this.props.chef.following.length; i++) {
            if (this.props.chef.following[i].userID == this.props.user._id )
              return true;
          }
          return false;
       
    }

    follow(id){
        Meteor.call('chefs.follow', id);
        Meteor.call('chefs.followMy', id);
    }

    unfollow(id){
        Meteor.call('chefs.unfollow', id);
        Meteor.call('chefs.unfollowMy', id);
    }

    renderReceips() {
        if (Meteor.user()) {

            event.preventDefault();

            const r = Recipes.find({ userID: this.props.chef.userID });
            
            return r.map((recipe) => {

                return (
                    <div>
                    <h3>{recipe.name}</h3>
                    <br />
                    <label for="description">Description: {recipe.description} </label>
                    <br />
                    <label for="name">Rating: {recipe.rating} </label>
                    <button key={recipe._id} aria-label="See this recipe" className=""  ></button>
                    </div>
                    );
            });

        }
    }

    renderVideos() {
        if (Meteor.user()) {

            event.preventDefault();

            const r = Recipes.find({ userID: this.props.chef.userID });
            
            return r.map((recipe) => {
                    var i = "https://www.youtube.com/embed/" + recipe.video + "?autoplay=0" ;
                    return (
                    <div>
                    <iframe width="200" height="150" src={i}>
                    </iframe>
                    </div>
                    );
            });

        }
    }
    render() {
        return (
            <div className="chef">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div>
                    <label htmlFor="">Name:</label>
                    <h1>{this.props.chef.name}</h1>
                    <br />
                    <label htmlFor="">Rating:</label>
                    {this.props.chef.rating}
                    <br />
                    <label htmlFor="">Biography:</label>
                    {this.props.chef.description}
                </div>
                {this.props.user && (this.props.user._id != this.props.chef.userID && this.isFollowing()) ?
                
                 <button aria-label="Send new comment" onClick={this.follow(this.props.chef._id)} >Follow</button>

                : ''}

                {this.props.user && (this.props.user._id != this.props.chef.userID && this.isFollowing()) ?
                
                 <button aria-label="Send new comment" onClick={this.unfollow(this.props.chef._id)} >Unfollow</button>

                : ''}

                {this.renderReceips()}

                {this.renderVideos()}

                
                
           

            </div>
        );
    }
}

Chef.propTypes = {
    chef: PropTypes.object.isRequired,
};


