const mongooseImage = require('mongoose');

const imageModelDAO = require('../models/image.model.ts');

imageModelDAO.statics = {
  create : function(data, cb) {
    var image = new this(data);
    image.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
}

const imageDAO = mongooseImage.model('images', imageModelDAO);

module.exports = imageDAO;
