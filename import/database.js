var async = require('async');
var mongo = require('mongodb');
var db = require('monk')('127.0.0.1:27017/components_db');
var components = db.get('components');
var publish_keys = db.get('publish_keys');
var subscribe_keys = db.get('subscripe_keys');

module.exports = {
	
	connection: db,
	components: components,
	publish_keys: publish_keys,
	subscribe_keys: subscribe_keys,
	insertComponent: function(component, callback)
	{
		components.insert(component, function(err, doc) {
			if (err) return callback(err);
			//console.log(doc);
			return callback(null);
		});
	},
	deleteAllComponents: function(callback)
	{
		components.remove({}, function(err)
		{
			if (err) return callback(err);
			return callback(null);
		})
	},
	insertPublishKeys: function(keys, callback)
	{
		if(Array.isArray(keys))
		{
			async.each(keys, 
			function(value, cb) {
				console.log("Insert publish key: " + JSON.stringify(value));
				publish_keys.findAndModify(
				{ 
					query: {
						"name": value.name,
						"type": value.type
					},
					update: { $setOnInsert: {
						"name": value.name,
						"type": value.type} }
				},
				{
					new: true, 
					upsert: true
				},
				function(err, doc){
					if (err) 
						return cb("Error while inserting publish-keys to the database: " + err);
					console.log("Insert publish keys finished");
					return cb(null);
				});
			},
			function(err) {
				if (err) callback(err);
				return callback(null);
			});
		}
		else 
		{
			console.log("Wrong publish data format. Array expected!");
			return callback(null); //callback("Wrong data format. Array expected!");
		}
	},
	insertSubscribeKeys: function(keys, callback)
	{
		if(Array.isArray(keys))
		{
			async.each(keys, 
			function(value, cb) {
				console.log("Insert subscribe key: " + JSON.stringify(value));
				subscribe_keys.findAndModify(
				{ 
					query: {
						"name": value.name,
						"type": value.type
					},
					update: { $setOnInsert: {
						"name": value.name,
						"type": value.type} }
				},
				{
					new: true, 
					upsert: true
				},
				function(err, doc){
					if (err) 
						return cb("Error while inserting subscribe-keys to the database: " + err);
					console.log("Insert subscribe keys finished");
					return cb(null);
				});
			},
			function(err) {
				if (err) callback(err);
				return callback(null);
			});
		}
		else 
		{
			console.log("Wrong subscribe data format. Array expected!");
			return callback(null); //callback("Wrong data format. Array expected!");
		}
	}
}

