// Imports
var parser = require('./parser.js');
var db = require('./database.js');
var jsonfile = require('jsonfile');
var async = require('async');

// Config
var file = './components.json'


async.waterfall(
[
	openComponentList,
	cleanDatabase,
	readAndSaveData
], 
function (err, result) 
{
	if (err) console.error(err);
	else
	{
		console.log("Import finished!")
		db.components.find({}, function(err, data) 
		{
			if (err) console.error(err);
			console.log(data);
			db.connection.close();
		});
	}
});


function openComponentList(callback)
{
	console.log("Reading component list")
	jsonfile.readFile(file, function(err, obj) 
	{
		if (err) 
			return callback("Failure at reading component list: " + err);
		else 
		return callback(null, obj);
	});
};

function cleanDatabase (obj, callback)
{
	console.log("Cleaning database")
	db.deleteAllComponents(function(err) 
	{
		if (err) return callback("Failure at cleaning the database: " +err);
		else callback(null, obj);
	});
}

function readAndSaveData(obj, callback)
{
	console.log("Parse data and save to database")
	async.forEachOf(obj, 
		function(value, key, cb)
		{
			console.log("Parsing entry " + key);
			parser(value.path, function(err, component) 
			{
				if (err) return cb("Failure at parsing the data: " + err);
				component.name = value.name;	
				console.log("Saving entry " + key)
				db.insertComponent(component, function(err, data){
					if (err) cb("Failure at writing to the database: " + err)
					else cb(null);
				})
			});
		},
		function (err)
		{
			if (err) return callback(err);
			else return callback(null);
		}
	);
}