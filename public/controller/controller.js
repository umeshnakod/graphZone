   var express = require('express');
    var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var sql = require('mysql');


module.exports = {
	getJSON:function (req,res) {
		var sends = null;
		db.employee.find().toArray(function (err,result) {
		sends = result;
		res.send(sends);
	})		

	},

	getDataFromSql:function (req,res) {

		console.log(req.body)
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

		console.log(response)


	}
}
