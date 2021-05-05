var express = require('express');
var router = express.Router();

let productController  = require('../controllers/product.controller.ts');

router.post('/add', productController.create);
router.get('/get', productController.findAll);
router.get('/get/:id', productController.findOne);
router.get('/add-to-cart', productController.addToCart);

module.exports = router;
