const imageMongoose = require('mongoose');

var Schema = imageMongoose.Schema;

const imageModel = new imageMongoose.Schema ({
  imageFront : {
    type : String,
    unique : true,
    required : true
  },
  imageBack : {
    type : String,
    unique : true,
    required : true
  },
  imageOne : {
    type : String,
    unique : true,
  },
  imageTwo : {
    type : String,
    unique : true,
  },
  sizeChart : {
    type : String,
    unique : true,
    required : true
  },
  uploaded_at : {
    type: Date,
    required : true,
    default : new Date()
  }
})

module.exports = imageModel;