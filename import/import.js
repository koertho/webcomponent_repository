//Imports
var async = require('async');

var get_list = 			require('./lib/read_component_list.js');
var db = 				require('./lib/database.js');
var html_content = 		require('./lib/extract_html_script.js');
var jsdoc_content = 	require('./lib/extract_jsdoc.js');
var polymer_content = 	require('./lib/extract_polymer.js');
var merge =				require('./lib/merge_data.js');



//Config
var component_list_path = './components.json';


async.waterfall(
[
	function (callback) {
		console.log("Reading component list");
		get_list(component_list_path, function(err, data){
			callback(err, data);
		})
	},
	function(obj, callback) {
		
		console.log("Cleaning database")
		db.deleteDatabase(function(err) {
			callback(err, obj);
		});
	},
	function (obj, callback) {
		console.log("Parse data and save to database");
		async.forEachOf(obj, 
			function(value, key, cb){
				async.parallel({
					html: function(call)
					{
						html_content(value.path, function(err, script_content) {
							if (err) return call(err);
							polymer_content(script_content, function(err, data) {
								return call(err, data);
							});
						});
					},
					jsdoc: function(call)
					{
						jsdoc_content(value.path, function(err, data){
							return call(err, data);
						});
					}
				}, 
				function(err, res){
					if (err) return cb(err);
					else
					{
						//console.log('Iteration: \n' + JSON.stringify(res.html) + '\n');
						merge(res.html, res.jsdoc, function(err, component, keywords)
						{
							
							db.insertComponent(JSON.parse(JSON.stringify(component)), function(err, data){
								if (err) return cb("Failure at writing to the database (" + component.name + "): " + err);
								db.insertKeywords(keywords, function(err){
									return cb(err);
								});
							});
						})
					}
				});
			},
			function(err)
			{
				if (err) console.error(err);
				return callback(null);
			}
		)
	},
	function(callback){
		console.log("Creating search index");
		db.components.index({
			"$**": "text"
		});
		return callback(null);
	}
], 
function (err, result) {
	console.log('Done!');
});