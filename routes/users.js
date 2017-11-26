var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/login', function(req, res,next){
  res.render('profiles/login');
})

/* GET users listing. */

router.get('/register', function(req, res,next){
   res.render('profiles/register', {error: req.flash('error')})
})

/* POST users listing. */
router.post('/register', function(req, res, next) {
  // res.send('hi');
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  if(req.body.email.length && req.body.name.length > 0 ){
     User.findOne({email : req.body.email}, function(err, userExist){
      if(userExist){
         req.flash('error', 'User with the provided email address already exist!!!');
         return res.redirect('register');
      }
      user.save(function (err, user){
           if(err) return next(err);
          //  req.flash('success', 'Welcome'+ user.name + 'Amazon clone shop well' );
           res.redirect('/')
        });
    })    
  }else{
    req.flash('error', 'Make sure you are filling the right information');
    return res.redirect('register');
  }
});

module.exports = router;



