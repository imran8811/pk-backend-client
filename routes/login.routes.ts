var express = require('express');
var router = express.Router();

let userController1 = require('../controllers/user.controller');

router.post('/', userController1.findOne);

module.exports = router;
