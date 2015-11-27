var parse = require('jsdoc-parse');

var extract_jsdoc = function (path, callback)
{
	var content = '';
	var stream = parse({src: path, html: true});
	stream.on('data', function(chunk) { 
		content += chunk.toString();
	});
	stream.on('error', function(error) {
		return callback(error);
	});
	stream.on('end', function() {
		var data =  JSON.parse(content);
		return callback(null, data);
	});
};

module.exports = extract_jsdoc;