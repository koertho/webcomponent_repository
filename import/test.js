var parser = require('./parser.js');
var db = require('./database.js');
var jsonfile = require('jsonfile');
var async = require('async');


var publish_keys = [
	{
		"name":"Test1",
		"type": "check1"
	},
	{
		"name": "Test2",
		"type": "check2"
	}
];

db.insertPublishKeys(publish_keys, function(err){
	if (err) console.log("Failure at writing publish keys to the database: " + err);
	
	db.publish_keys.find({}, function(err, data)
	{
		console.log(data);
	})
});


/*
db.insertSubscribeKeys(subscribe_keys, function(err){
		if (err) return cb("Failure at writing subscribe keys to the database: " + err);
		return cb(null);
	});
*/