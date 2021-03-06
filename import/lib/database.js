var async = require('async');
var db = require('monk')('127.0.0.1:27017/components_db');
var components = db.get('components');
var keywords = db.get('keywords');

module.exports = {
	
	connection: db,
	components: components,
	keywords: keywords,
	insertComponent: function(component, callback)
	{
		components.insert(component, function(err, doc) {
			return callback(err);
		});
	},
	deleteDatabase: function(callback){
		components.remove({}, function(err)
		{
			if (err) return callback(err);
			keywords.remove({}, function(err){
				return callback(err);
			})
		})
	},
	insertKeywords: function(keys, callback)
	{
		if(Array.isArray(keys))
		{
			async.each(keys, 
			function(value, cb) {
				//console.log("Insert key: " + JSON.stringify(value));
				keywords.findAndModify(
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
						return cb("Error while inserting keys to the database: " + err);
					//console.log("Insert keys finished");
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

