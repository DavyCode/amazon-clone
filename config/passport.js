var passport = require("passport-local"),
    LocalStrategy = require('passport-local').Strategy();


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());


// passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
