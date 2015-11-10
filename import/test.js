var parser = require('./parser.js');
var db = require('./database.js');
var jsonfile = require('jsonfile');
var async = require('async');



db.keywords.find({}, function(err, data)
{
	console.log(data);
})



/*
db.insertSubscribeKeys(subscribe_keys, function(err){
		if (err) return cb("Failure at writing subscribe keys to the database: " + err);
		return cb(null);
	});
*/