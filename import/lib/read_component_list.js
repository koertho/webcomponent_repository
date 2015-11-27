var jsonfile = require('jsonfile');

var component_list = function (path, callback) {
	jsonfile.readFile(path, function(err, obj) 
	{
		if (err) 
			return callback("Failure at reading component list: " + err);
		else 
			return callback(null, obj);
	});
};

module.exports = component_list;