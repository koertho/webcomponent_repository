//var parser = require('./parser.js');
//var db = require('./database.js');
//var jsonfile = require('jsonfile');
//var async = require('async');
var htmlparser = require("htmlparser2");
var fs = require('fs');
var path = require('path');
var stripJsonComments = require('strip-json-comments');
var jsonic = require('jsonic')
var JSON5 = require('json5');

var extract = require('./lib/polymer_extract.js');


var filePath = "../../easy-pagination/easy-pagination.html";
var sem = false;

var content = fs.readFileSync(filePath, { encoding: 'utf8' });
var polymerContent = '';


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
		getJSONOutOfPolymerObject(polymerContent);
	}
});

function getJSONOutOfPolymerObject (data) {
	extract(data, function(err, list)
	{
		console.log(list);
	});
	
	
	
	
	
	/*
	
	var zwischending = stripJsonComments(data.trim().substring(8).slice(0,-2));
	
	
	var fixedJSON = zwischending.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
	
	fixedJSON = fixedJSON.replace(/\ +/g, ' ');
	*/

}

parser.write(content);
parser.end();