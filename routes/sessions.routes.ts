var express = require('express');
var router = express.Router();

let sessionController  = require('../controllers/session.controller.ts');

router.get('/getall', sessionController.findAll);
router.get('/get/:id', sessionController.findOne);
router.put('/update/:id', sessionController.update);
router.delete('/delete/:id', sessionController.delete);

module.exports = router;
