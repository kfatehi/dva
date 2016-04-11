"use strict";
const models  = require('../models');
const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login')
const router  = express.Router();

router.get('/users', function(req, res) {
  models.User.findAll({
  }).then(function(users) {
    res.send({
      title: 'Express',
      users: users
    });
  });
});


// Define routes.
router.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('login');
});
  
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});
  
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/profile', ensureLogin.ensureLoggedIn(), function(req, res){
  res.render('profile', { user: req.user });
});

module.exports = router;
