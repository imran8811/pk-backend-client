const mongooseSession = require('mongoose');

const sessionModelDAO = require('../models/session.model.ts');

sessionModelDAO.statics = {
  create : function(data, cb) {
    var user = new this(data);
    user.save(cb);
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

const sessionDAO = mongooseSession.model('sessions', sessionModelDAO);

module.exports = sessionDAO;
