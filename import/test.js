
var db = require('./lib/database.js');


db.components.find({
	"methods.params.type.names": "Number"
}, function(err, data) {
	console.log(JSON.stringify(data));
});




