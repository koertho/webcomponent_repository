
var db = require('./lib/database.js');


db.components.dropIndex('$**_text', function(err, data){
	console.log(data);
});

//db.components.index({"name": "text"});

/*
db.components.indexes(function(err, data){
	console.log(data);
});


/*
db.components.index({
	"$**": "text"
});

db.components.index({"$**": "text"});

db.components.find({
	"$text": {
		"$search": "Seite"
	}
}, function(err, data) {
	console.log(JSON.stringify(data));
});

*/


