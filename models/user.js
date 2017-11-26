var mongoose = require('mongoose'),
    // passportLocalMongoose = require('passport-local-mongoose');
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    email : { type: String, unique: true, lowercase : true},
    password: String,

    profile :{
      name :{ type : String, default : ""},
      image : { type : String, default: ""}
    },

    address : String,
    history : [{
      date : Date,
      // { type :Date, default: Date.now},
      paid : {type: Number, default : 0},
      // item : { type : mongoose.Schema.Types.objectId,
      //         ref : ""
      // }
    }]
});


//hash password
UserSchema.pre('save', function(next){
   var user = this;
   if(!user.isModified('password')) return next();
   bcrypt.genSalt(10, function(err, salt){
     if(err) return next(err);
     bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
     });
   });
});

//Compare password in db
UserSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.password)
}

// UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
