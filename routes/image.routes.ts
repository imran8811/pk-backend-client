var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer();

let imageController  = require('../controllers/image.controller.ts');

router.post('/upload', upload.single('image'), imageController.upload);
router.delete('/delete/:id', imageController.deleteOne);
router.delete('/delete/dir/:id', imageController.delDirectory);

module.exports = router;
