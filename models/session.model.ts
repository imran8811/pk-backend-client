const sessionMongoose = require('mongoose');

var Schema = sessionMongoose.Schema;

const sessionModel = new sessionMongoose.Schema ({
  userEmail : {
    type : String,
    unique : true,
    required : true
  },
  userPassword : {
    type : String,
    required : true
  },
  joined_at : {
    type: Date,
    required : true,
    default : new Date()
  },
  fullName : {
    type : String,
    required : true
  },
  businessName : {
    type : String,
    required : true
  },
  status : {
    type : Number,
    required : true,
    default : 0
  }
})

module.exports = sessionModel;