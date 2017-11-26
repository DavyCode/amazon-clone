var passport = require("passport-local"),
    LocalStrategy = require('passport-local').Strategy();


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());


// passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
   User.findById(id, function(err, user){
       done(err, user);
   });
});


//Middleware
passport.use("local-login", new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
}, function(req, email, password, done){
     User.findOne({ email: email}, function(err, user){
        if(err) return done(err);

        if(!user){
            return done(null, false, req.flash('loginMessage', 'No user has been found'))
        }

        if(!user.comparePassword(password)){
          return  done(null, false, req.flash('loginMessage', 'Oops! Wrong password'))
        }

        return done (null, user)
     });
}) );

//validate user
exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect ('/login');
}