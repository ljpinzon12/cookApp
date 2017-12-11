import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('recipes', function recipesPublication() {
    return Recipes.find({});
  });
}

Meteor.methods({
    'recipes.insert'(userId, name, description, process,video, ingredients,typeOfFood , country) {
        check(name, String);
    
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        Recipes.insert({
          name,
          userID: userId,
          username: Meteor.users.findOne(this.userId).username,
          createdAt: new Date(),
          description,
          process,
          comments: [],
          rating: 0,
          video,
          ingredients,
          typeOfFood,
          country,
        });
      }
  ,
});
