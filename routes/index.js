var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/users', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

module.exports = router;
