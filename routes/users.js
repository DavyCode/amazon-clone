var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/login', function(req, res,next){
  res.render('profiles/login')
})

/* GET users listing. */

router.get('/register', function(req, res,next){
   res.render('profiles/register')
})

/* POST users listing. */
router.post('/register', function(req, res, next) {
  // res.send('hi');
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({email : req.body.email}, function(err, userExist){
    if(userExist){
        console.log('User already exist!!!!!!!');
       return res.redirect('register');
    }
      user.save(function (err, user){
         if(err) return next(err);
         res.json('Successfully created new user!!!');
      });
  })
});

module.exports = router;
