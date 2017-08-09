var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var format = require("util").format;
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var sql = require('mysql');
var bodyParser = require('body-parser');
var multer  =   require('multer');
var app = express();

// CROSS ORIGIN
    
  app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
  }));

app.set('views',__dirname+'/views');

app.use(express.static(__dirname + '/views'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));


app.engine('html',require('ejs').renderFile);


var getJSON = require('./public/routes/route.js');

app.use('/', getJSON);

app.get('/',function (req,res) { 


	res.sendFile(path.join(__dirname+'/views/index.html'))
})

app.listen(3000,function () {
	console.log('server running');
})


