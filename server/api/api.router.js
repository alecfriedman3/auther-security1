'use strict';

var router = require('express').Router();

// var User=require('./users/user.model')

// router.use('/', function (req, res, next){
//   User.findById(req.session.passport.user)
//   .then(function ())
// })

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

module.exports = router;
