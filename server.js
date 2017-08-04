var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var format = require("util").format;
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('views',__dirname+'/view');
app.engine('html',require('ejs').renderFile);


var getJSON = require('./public/routes/route.js');
app.use('/', getJSON);


app.get('/',function (req,res) {

	res.sendFile(path.join(__dirname+'/view/index.html'))
})


app.listen(3000,function () {
	console.log('server running');
})


