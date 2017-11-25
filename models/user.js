var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


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
      paid : {type: Number, default : 0},
      // item : { type : mongoose.Schema.Types.objectId,
      //         ref : ""
      // }
    }]
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
