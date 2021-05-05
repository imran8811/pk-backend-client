var express = require('express');
var router = express.Router();

let userController  = require('../controllers/user.controller.ts');

router.get('/getall', userController.findAll);
router.get('/get/:id', userController.findOne);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

module.exports = router;
