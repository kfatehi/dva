"use strict";
const models  = require('../models');
const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login')
const router = express.Router();

router.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  if (req.body.password === req.body.password_confirm) {
    models.User.createWithPassword(req.body.password, {
      email: req.body.email,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
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

router.get('/workspace', function(req, res) {
  res.render('workspace');
})

router.get('/data-sources.:format?', function(req, res) {
  let dataSources = [{
    name: "my data"
  }]
  if (req.params.format === 'json') {
    res.json(dataSources)
  } else {
    res.render('data-sources/index', {
      dataSources: dataSources
    });
  }
})

router.get('/data-sources/new', (req, res, next) => {
  res.render('data-sources/new', {
    types: models.DataSources.TYPES
  })
})

const browserify = require('browserify');

const viz = require('../src/viz')();

router.get('/extensions/:extname/index.js', function(req, res, next) {
  viz.extensions.load(req.params.extname).then(function(ext) {
    var b = browserify();
    b.add(`${ext.dirname}/index.js`);
    b.bundle().pipe(res)
  })
});

router.get('/extensions/:extname', function(req, res, next) {
  console.log(req.params.name);
  res.render('extension-test', {
    extname: req.params.name
  })
});

module.exports = router;
