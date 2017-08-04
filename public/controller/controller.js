   var express = require('express');
    var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);



module.exports = {
	getJSON:function (req,res) {
		var sends = null;
		db.employee.find().toArray(function (err,result) {
			console.log("aaaaaaaaa",result)
		sends = result;
		res.send(sends);
	})		

	}
}
