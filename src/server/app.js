"use strict";
const express = require('express');
const app = express();
const server = require('http').Server(app);
const models = require('./models');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const layout = require('express-layout');
const path = require('path');
const debug = require('debug')('dva:src/server/app');
const error = require('debug')('dva:src/server/app:error');
const io = require('socket.io').listen(server);
import * as extensions from '../extensions';
import * as actionCreators from './action-creators';

module.exports.app = app
module.exports.server = server;

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

const cookieParser = require('cookie-parser');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('dev', 'combined'));
app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));

const JsonStore = require('express-session-json')(session);

const sessionStore = new JsonStore({
  path: path.resolve(`${__dirname}/../../var`),
  filename: `sessions.${app.get('env')}.json`
})

const sessionSecret = 'loosely-named-a-secret';

app.use(session({
  resave: false,
  secret: sessionSecret,
  saveUninitialized: false,
  store: sessionStore
}));


function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept){
  console.log('failed connection to socket.io:', message);

  if(error)
    accept(new Error(message));
  // this error will be sent to the user as a special error-package
  // see: http://socket.io/docs/client-api/#socket > error-object
}

const passportSocketIo = require('passport.socketio');

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: sessionSecret,
  store: sessionStore,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(layout());

app.use(routes);

app.use('/ext', express.static('extensions'));

app.use(express.static('public'));

io.on('connection', function(socket) {
  const user = socket.request.user;
  debug(`${user.email} connected`);

  let notebooks = [{
    uuid: '44a8b08b-dfd1-4a8e-aca0-7792add06e47',
    name: 'The Titanic Story',
  },{
    uuid: 'cdc2c9a0-4fc5-452d-99b3-d57c8618c4e8',
    name: 'Student Grades'
  }]


  socket.emit('action', actionCreators.setNotebooks(notebooks));

  user.getNotebooks().then(function(notebooks) {
    console.log('NOTEBOOKS', notebooks);
  })

  socket.on('action', function(action) {
    switch (action.type) {
      case 'LOAD_NOTEBOOK':
        return sendNotebook(socket, user, action.uuid);
      case 'SAVE_NOTEBOOK':
        return saveNotebook(socket, user, action.uuid);
    }
  })
});

function sendNotebook(socket, user, uuid) {
  try {
    var fs = require('fs');
    const buf = fs.readFileSync(__dirname+'/../../var/notebooks/'+uuid+'.json');
    const { cells, cellsById } = JSON.parse(buf.toString());
    const action = actionCreators.setNotebook(uuid, cells, cellsById);
    socket.emit('action', action);
  } catch (e) {
    error(e.message);
  }
}
