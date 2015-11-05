var mongo = require('mongodb');
var assert = require('assert');
var db = require('monk')('localhost:27017/components_db');
var components = db.get('components');



components.aggregate([
	{
		$unwind: "$subscription"
	}, 
	{
		$group: {
			"name": "$subscription.name"
		}
	}
])