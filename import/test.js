
var db = require('./lib/database.js');

db.components.find({}, function(err, data) {
	console.log(JSON.stringify(data));
});




