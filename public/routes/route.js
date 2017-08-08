    // Defined all required module

    var express = require('express');
    var router = express.Router();



    // loaded all supoorted controller

    var logController = require('../controller/controller');



    // calling function
    router.get('/getJSON', logController.getJSON);
    router.post('/getDataFromSql',logController.getDataFromSql);
   router.post('/getTableFileds',logController.getFiledFromDatabase);


    module.exports = router;
