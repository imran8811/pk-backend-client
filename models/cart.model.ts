const cartMongoose = require('mongoose');

var Schema = cartMongoose.Schema;

const cartModel = new cartMongoose.Schema ({
  productId : {
    type : String,
    required : true,
  },
  styleNo : {
    type : String,
    required : true
  },
  orderType : {
    type : String,
    required : true,
  },
  sizes : {
    type : [],
    required : true
  },
  quantity : {
    type : [],
    required : true
  },
  uploaded_at : {
    type: Date,
    required : true,
    default : new Date()
  }
})

module.exports = cartModel;