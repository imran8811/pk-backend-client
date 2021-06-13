const orderMongoose = require('mongoose');

var Schema = orderMongoose.Schema;

const orderModel = new orderMongoose.Schema ({
  orderQuantity : {
    type : Number,
    required : true
  },
  shippingAddress : {
    type : String,
    required : true
  },
  whatsappNo : {
    type : String,
    required : true
  },
  ordered_at : {
    type: Date,
    required : true,
    default : new Date()
  },
  status : {
    type : String,
    required : true,
    default : 'Pending'
  }
})

module.exports = orderModel;