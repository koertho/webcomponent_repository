var htmlparser = require("htmlparser2");
var fs = require('fs');
var path = require('path');

var html_extract =  function (path, callback)
{
	var content = fs.readFileSync(path, { encoding: 'utf8' });
	var polymerContent = '';
	var sem = false;
	
	var parser = new htmlparser.Parser({
		onopentag: function(name, attribs){
			if (name === "script")
				sem = true;
		},
		ontext: function(text){
			if (sem === true)
				polymerContent += text;
		},
		onclosetag: function(name){
			if (name === "script")
				sem = false;
		},
		onend: function (){
			return callback(null, polymerContent);
		}
	});
	parser.write(content);
	parser.end();
};

module.exports = html_extract;