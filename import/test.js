var mongo = require('mongodb');
var assert = require('assert');
var jsonfile = require('jsonfile');
var db = require('monk')('localhost:27017/components_db');
var components = db.get('components');



components.find({}, function(err, data) {
	if (err) console.error(err);
	console.log(data);
	db.close();
});