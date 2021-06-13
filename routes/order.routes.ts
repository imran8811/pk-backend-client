var express = require('express');
var router = express.Router();

let orderController  = require('../controllers/order.controller.ts');

router.post('/add', orderController.create);
router.get('/getall', orderController.findAll);
router.get('/get/:id', orderController.findOne);
router.put('/update/:id', orderController.update);
router.delete('/delete/:id', orderController.delete);

module.exports = router;
