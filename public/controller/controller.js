   var express = require('express');
    var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var sql = require('mysql');
var fs = require('fs');
module.exports = {
	getJSON:function (req,res) {
		var sends = null;
		db.employee.find().toArray(function (err,result) {
		sends = result;
		res.send(sends);
	})		

	},

	getDataFromSql:function (req,res) {
		// {host: 'localhost',
  //   user     : 'mylocal',
  //   password : '123',
  //   database : 'sakila'}

	var con = sql.createConnection({
			host: 'localhost',
		    user     : 'mylocal',
		    password : '123',
		    database : 'sakila'
		});

	var dataStructure = [];

		var response = null;
		con.connect(function(err) {

		  if (err) throw err;

		  var sql = "show tables";

		  con.query(sql, function (err, result) {

		    if (err) throw err;

		    res.send(result)
		    // var arr = [];
		    // result.forEach(function (item) {
		    // 	for(var key in item){
		    // 			arr.push(item[key])
		    // 	}

		    // 	res.send(arr)
		    // })
		 //    var newArr = [];
			// var c = 0;
			// var keyMap = {};
			// var keyMapRecords = [];
		 //    arr.forEach(function (item1) {
		 //    	var subQuery = 'select * from '+ item1;
		 //    	con.query(subQuery,function (err,resp) {
		 //    		if(err) throw err;
		 //    		else{
		 //    			var keysArray = [];
		 //    			resp.forEach(function(rec){
		 //    				Object.keys(rec).forEach(function(key){
		 //    					keysArray.push(key);
		 //    				})
		 //    			})
		 //    			if(!keyMap[(item1)]) keyMap[(item1)] = [];
		 //    			keysArray.forEach(function(akey){
		 //    				keyMap[(item1)].push(akey);
		 //    			})
		 //    			c++;
		 //    			// newArr.push(resp);
		 //    			if(c == arr.length){
		 //    						    var finalArray = [];
		 //    Object.keys(keyMap).forEach(function(itemkey){
		 //    	finalArray.push({
		 //    		tableName : itemkey,
		 //    		tableKeys : keyMap[itemkey]
		 //    	})
		 //    })
		 //    res.send(finalArray)
		 //    console.log("finalArray = ",finalArray);
		 //    				// res.send(newArr)
		 //    			}
		    			
		 //    		}
		    		
		 //    	})
		 //     })



		    // console.log("=======================================================================",newArr)
		  });

		});	
			
		    
	}
}
