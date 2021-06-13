const mongooseOrder = require('mongoose');

const orderModelDAO = require('../models/order.model.ts');

orderModelDAO.statics = {
  create : function(data, cb) {
    var order = new this(data);
    order.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  getByName: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  },

  logout: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
}

const orderDAO = mongooseOrder.model('orders', orderModelDAO);

module.exports = orderDAO;
