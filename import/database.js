var mongo = require('mongodb');
var assert = require('assert');
var db = require('monk')('localhost:27017/components_db');
var components = db.get('components');

module.exports = {
	
	insertComponent: function(component, callback)
	{
		components.insert(component, function(err, doc) {
			if (err) return callback(err);
			console.log(doc);
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
	'connection': db,
	'components': components
}

