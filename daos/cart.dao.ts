const mongooseCart = require('mongoose');

const cartModelDAO = require('../models/cart.model.ts');

cartModelDAO.statics = {
  create : function(data, cb) {
    var cart = new this(data);
    cart.save(cb);
  },

  get: function(query, cb) {
    this.findAll(query, cb);
  },

  getByName: function(query, cb) {
    this.findOne(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  },
}

const cartDAO = mongooseCart.model('cart', cartModelDAO);

module.exports = cartDAO;
