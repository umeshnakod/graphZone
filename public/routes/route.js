    // Defined all required module

    var express = require('express');
    var router = express.Router();



    // loaded all supoorted controller

    var logController = require('../controller/controller');



    // calling function
    router.get('/getJSON', logController.getJSON);




    module.exports = router;
