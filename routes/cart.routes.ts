var express = require('express');
var router = express.Router();

let cartController  = require('../controllers/cart.controller.ts');

router.post('/add', cartController.create);
router.get('/get/all', cartController.findAll);
router.get('/get/:id', cartController.findOne);
router.get('/update/:id', cartController.findOne);
router.get('/delete/:id', cartController.findOne);

module.exports = router;
