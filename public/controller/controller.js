var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('SAMS-Phase3',['employee']);
var sql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var multer  = require('multer');
var Converter = require("csvtojson").Converter;

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

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
					// res.send(result)  //********************************commenting for now
			    });
			});	
		}
		console.log("response",response)

		var con = sql.createConnection({
			host: 'localhost',
		    user     : 'root',
		    password : 'root',
		    database : 'sakila'
		});
		// var con = sql.createConnection({
		// 	host: 'localhost',
		//     user     : 'mylocal',
		//     password : '123',
		//     database : 'sakila'
		// });

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
	},

	getFiledFromDatabase:function (req,res) {
		
		var con = sql.createConnection({
			host: 'localhost',
		    user     : 'root',
		    password : 'root',
		    database : 'sakila'
		});

		// var con = sql.createConnection({
		// 	host: 'localhost',
		//     user     : 'mylocal',
		//     password : '123',
		//     database : 'sakila'
		// });
		var table = req.body;
		console.log('table = ',table)
		var newArr = [];
		var keyMap = {};
		var keyMapRecords = [];
		var subQuery = 'select * from '+ table.table;
		con.query(subQuery,function (err,resp) {
    		if(err) throw err;
    		else{
    			var keysArray = [];
    			resp.forEach(function(rec){
    				Object.keys(rec).forEach(function(key){
    					keysArray.push(key);
    				})
    			})
    			if(!keyMap[(table.table)]) keyMap[(table.table)] = [];
    			keysArray.forEach(function(akey){
    				keyMap[(table.table)].push(akey);
    			})
	    			
	    		var finalArray = [];
			    Object.keys(keyMap).forEach(function(itemkey){
			    	finalArray.push({
			    		tableName : itemkey,
			    		tableKeys : keyMap[itemkey]
			    	})
			    })

				Array.prototype.unique= function (){
				  	return this.reduce(function(previous, current, index, array)
				   	{
				     	previous[current.toString()+typeof(current)]=current;
				     	return array.length-1 == index ? Object.keys(previous).reduce(function(prev,cur)
				       	{
				          	prev.push(previous[cur]);
				          	return prev;
				       	},[]) : previous;
				   	}, {});
				};
				finalArray[0]['tableKeys'] = finalArray[0]['tableKeys'].unique();
		    	res.send(finalArray);
    		}
		}) 
	},

	fileUpload:function(req,res) {
		upload(req,res,function(err,result){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            console.log("the result = ",result)
             res.json({error_code:0,err_desc:null});
        })
	}
}
