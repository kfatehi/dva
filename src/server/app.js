"use strict";
const express = require('express');
const app = express();
const models = require('./models');
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const layout = require('express-layout')

module.exports = app;

app.set('port', process.env.PORT || 3000);

// Configure view engine to render EJS templates.
app.set('views', `${__dirname}/views`);
app.set('layouts', `${__dirname}/views/layouts`);
app.set('layout', 'default');
app.set('view engine', 'ejs');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`email` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(function(email, password, cb) {
  models.User.findOne({ where: { email: email } }).then(function(user) {
    return user.comparePassword(password)
  }).then(function(user) {
    return cb(null, user);
  }).catch(function(err) {
    return cb(null, false)
  })
}));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  models.User.findById(id).then(function(user) {
    if (!user) return cb(null, false);
    cb(null, user);
  }).catch(cb)
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('dev', 'combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

if (app.get('env') === 'development') {
  const JsonStore = require('express-session-json')(session);
  app.use(session({
    resave: false,
    secret: 'loosely-named-a-secret',
    saveUninitialized: false,
    store: new JsonStore({ path: __dirname })
  }));
} else {
  app.use(session({
    resave: false,
    secret: 'loosely-named-a-secret',
    saveUninitialized: false
  }));
}

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(layout());

app.use(routes);

app.use('/ext', express.static('extensions'));

app.use(express.static('public'));
