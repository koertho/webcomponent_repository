var parser = require('./parser.js');
var db = require('./database.js');
var jsonfile = require('jsonfile');
var async = require('async');



db.components.find({
		"publish_keys": {
			"$elemMatch":{
				"name": key
		}}}, function(err, docs){
		if (err) console.err("Fehler beim Suchen nach Komponenten in der Datenbank: " + err);
		console.log(docs)
	});



/*
db.insertSubscribeKeys(subscribe_keys, function(err){
		if (err) return cb("Failure at writing subscribe keys to the database: " + err);
		return cb(null);
	});
*/