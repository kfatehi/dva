"use strict";
const models = require('../models');
const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login')
const router = express.Router();
const debug = require('debug')('dva:router')
const commonmark = require('commonmark');
const fs = require('fs');

function markdownCompile(mdFilePath) {
  var content = fs.readFileSync(mdFilePath).toString()
  var reader = new commonmark.Parser();
  var writer = new commonmark.HtmlRenderer();
  var parsed = reader.parse(content);
  return writer.render(parsed);
}

router.get('/', function(req, res) {
  if (req.user) {
    res.render('app', { user: req.user, layout: 'react' });
  } else {
    res.render('welcome', { user: req.user });
  }
});

router.get('/help', function(req, res) {
  res.render('help', {
    user: req.user,
    userGuide: markdownCompile(`${__dirname}/../../../docs/user-guides/user-guide.md`)
  });
});

router.get('/gallery', function(req, res) {
  res.render('gallery', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { user: req.user });
});

router.post('/register', function(req, res, next) {
  if (req.body.password === req.body.password_confirm) {
    models.User.createWithPassword(req.body.password, {
      email: req.body.email
    }).then(function(user) {
      req.login(user, function(err){
        if(err) return next(err);
        res.redirect('/');
      });
    }).catch(next)
  } else {
    next(new Error("Password does not match confirmation"))
  }
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
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
