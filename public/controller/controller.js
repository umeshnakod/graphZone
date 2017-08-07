var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var sql = require('mysql');

var MongoClient = require('mongodb').MongoClient;


module.exports = {
	getJSON:function (req,res) {
		var sends = null;
		db.employee.find().toArray(function (err,result) {
			sends = result;
			res.send(sends);
		})		
	},

	getDataFromSql:function (req,res) {
		console.log("req.body",req.body)
		if(req.body.dbType == "mongodb"){
			if(req.body.port == undefined || req.body.port == null || req.body.port == '') req.body.port = 27017;
			var connectionUrl = "mongodb://"+req.body.host+":"+req.body.port+"/"+req.body.databaseName;
			// MongoClient.connect('mongodb://localhost:27017/contactdatalist', function(err, connection) {
			MongoClient.connect(connectionUrl, function(err, connection) {
				if(err) console.log("XXXXXXXXXXX__ Error connecting to mongodb __XXXXXXXXXXX")
				else{
					console.log("====!! Mongo Connected !!====");
				}
				
			});
		}
		else{
			var con = sql.createConnection(req.body);
			var response = null;
			con.connect(function(err) {
				if (err) throw err;
				var sql = "show tables";
				con.query(sql, function (err, result) {
					if (err) throw err;
				    response = result;
					res.send(result)
			    });
			});	
		}
		console.log("response",response)
	}
}
