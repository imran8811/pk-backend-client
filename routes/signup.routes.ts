var express = require('express');
var router = express.Router();

let userControllerSignup = require('../controllers/user.controller');

router.post('/', userControllerSignup.create);

module.exports = router;
