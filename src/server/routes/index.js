"use strict";
const models = require('../models');
const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login')
const router = express.Router();
const debug = require('debug')('dva:router')

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

const fs = require('fs');

router.get('/extensions.:format?', function(req, res, next) {
  fs.readdir(`${__dirname}/../extensions`, function(err, files) {
    if (err) return next(err);
    let extensions = files
    .filter(name => name[0] !== '.')
    .map(e => { return {name: e} });
    if (req.params.format === 'json') {
      res.json(extensions)
    } else {
      res.render('extensions/index', { extensions });
    }
  })
})

const viz = require('../../viz')();
const webpack = require('webpack');
const MemoryFS = require("memory-fs");

router.get('/extensions/:extname/:script*', function(req, res, next) {
  var script = req.params.script+req.params["0"]
  viz.extensions.load(req.params.extname).then(function(ext) {
    let scriptPath = `${ext.dirname}/${script}`;
    var fs = new MemoryFS();
    var compiler = webpack({
      entry: scriptPath,
      output: {
        path: "/wat",
        library: "tmp",
        filename: 'tmp.js'
      }
    })
    compiler.outputFileSystem = fs;
    compiler.run(function(err, stats) {
      if (err) return next(err);
      try {
        let result = fs.readFileSync('/wat/tmp.js');
        res.status(200).end(result);
      } catch (e) {
        res.status(404).end('Not Found');
      }
    })
  }).catch(function(e) {
    res.status(404).end('Not Found');
  })
});

router.get('/extensions/:extname', function(req, res, next) {
  viz.extensions.load(req.params.extname).then(function(ext) {
    res.render('extension-show', {
      ext,
      layout: 'extension'
    })
  })
});

module.exports = router;