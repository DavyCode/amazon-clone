var express = require('express');
var router = express.Router();

var User = require('../models/user')



/* GET users listing. */
router.get('/register', function(req, res, next) {
  // res.send('');
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function (err){
     (err)? next(err): res.json('Successfully created new user')
  })
});

module.exports = router;
