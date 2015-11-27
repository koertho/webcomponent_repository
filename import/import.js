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
/*	function(obj, callback) {
		
		console.log("Cleaning database")
		db.deleteAllComponents(function(err) 
		{
			if (err) return callback("Failure at cleaning the database: " +err);
			else callback(null, obj);
		});
	},*/
	function (obj, callback) {
		console.log("Parse data and save to database");
		async.forEachOf(obj, 
			function(value, key, cb){
				async.parallel({
					html: function(call)
					{
						html_content(value.path, function(err, script_content) {
							if (err) return cb(err);
							polymer_content(script_content, function(err, data) {
								call(err, data);
							});
						});
					},
					jsdoc: function(call)
					{
						jsdoc_content(value.path, function(err, data){
							call(err, data);
						});
					}
				}, 
				function(err, res){
					if (err) throw err;
					else
					{
						//console.log('Iteration: \n' + JSON.stringify(res.html) + '\n');
						//res.html.properties.type
						
						//console.log(JSON.stringify(res.jsdoc))
						
						
						merge(res.html, res.jsdoc, function(err, data)
						{
							
							//console.log(data);
							return cb(err);
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
	}
], 
function (err, result) {
	//console.log(result);
});