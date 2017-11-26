var express = require('express');
var router = express.Router();

var User = require('../models/user');



/* GET users listing. */
router.post('/register', function(req, res, next) {
  // res.send('hi');
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function (err){
     if(err) return next(err);
     res.json('Successfully created new user')
  })
});

module.exports = router;
