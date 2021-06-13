var bcrypt = require('bcryptjs');
var express = require('express');
var imageDAOCont = require('../daos/image.dao.ts');
var path = require("path");
var mv = require('mv');
var fs = require('fs');
var app  = express();

exports.upload = (req, res) => {
  const uploadImages = req.body.images;
  const styleNo = req.body.styleNo;
  fs.mkdirSync('./public/'+styleNo, {recursive: true}, (err) => {
    if(err) {
      res.status(400).send(err);
    }
  });
  for (var key in uploadImages){
    if(uploadImages[key] != ''){
      const tempPath = uploadImages[key];
      const getFileName = tempPath.split('\\').pop();
      const targetPath = path.join(__dirname, "../public/"+styleNo+'/'+getFileName);
      mv(tempPath, targetPath, err => {
        res.send(err);
      });
    }
  }
  res.status(200).send("Files uploaded!");
}

exports.delDirectory = (req, res) => {
  const styleNo = req.body.styleNo;
  fs.rmdirSync('./upload/'+styleNo), (err) => {
    if(err){
      return res.status(400).send(err); 
    } else {
      return res.status(200).send('Directory deleted');
    }
  }
} 

exports.deleteOne = (req, res) => {
  imageDAOCont.deleteOne({email: req.body.email})
  .then((data) => {
    if(data.deletedCount === 0) {
      return res.status(404).send({
        errorCode : "420",
        message : "No User Found"
      })
    } else {
      res.status(200).send({
        type: "success",
        message : 'user deleted successfully'
      });
    }
  })
  .catch((err) => {
    return res.status(400).send({
      message : "error while updating the user"
    })
  })
}
