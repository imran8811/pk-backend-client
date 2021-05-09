const mongooseProduct = require('mongoose');

const productModelDAO = require('../models/product.model.ts');

productModelDAO.statics = {
  create : function(data, cb) {
    var product = new this(data);
    product.save(cb);
  }
}

const productDAO = mongooseProduct.model('product', productModelDAO);

module.exports = productDAO;
