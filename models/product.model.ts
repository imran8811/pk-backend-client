const productMongoose = require('mongoose');

var Schema = productMongoose.Schema;

const productModel = new productMongoose.Schema ({
  department : {
    type : String,
    required : true,
  },
  category : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true,
    unique : true
  },
  uploaded_at : {
    type: Date,
    required : true,
    default : new Date()
  },
  styleNo : {
    type : String,
    required : true,
    unique : true
  },
  color : {
    type : String,
    required : true
  },
  prices : {
    type : [],
    required : true,
  },
  fabricDetails : {
    type : Object,
    required : true,
  },
  washDetails : {
    type : Object,
    required : true,
  },
  description : {
    type : String,
    required : true,
  }
})

module.exports = productModel;