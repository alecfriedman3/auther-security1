'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

module.exports = new GoogleStrategy({
  clientID: '664886113879-nfusui7qu8ljo61dqlghjla02rfmdb58.apps.googleusercontent.com',
  clientSecret: require('../../secret').googSecret,
  callbackURL: '/auth/google/callback'
}, function (token, refreshToken,  profile, triggerSerializationOfUser) {
  // this only runs when somebody logs in through google
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: {
      email: profile.emails[0].value,
      name: profile.displayName,
      photo: profile.photos[0].value
    }
  })
  .spread(function (user) {
    triggerSerializationOfUser(null, user);
  })
  .catch(triggerSerializationOfUser);
});
