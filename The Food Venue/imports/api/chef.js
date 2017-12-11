import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chefs = new Mongo.Collection('chefs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('chefs', function recipesPublication() {
    return Chefs.find({});
  });
}

Meteor.methods({
    'chefs.insert'( name, country, email, phone,age,gender) {
        check(name, String);
    
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        Chefs.insert({
          name,
          userID: this.userId,
          username: Meteor.users.findOne(this.userId).username,
          createdAt: new Date(),
          country,
          email,
          phone,
          age,
          gender,
        });
      }
  , 'chefs.searchByUserName' (id) {
    
            console.log(id);
            if (!id) {
                throw new Meteor.Error('not-authorized');
            }
    
            return Exercisers.findOne({
                userID: id
            });
    
        },
});
