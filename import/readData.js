// Imports
var parser = require('./parser.js');
var db = require('./database.js');
var jsonfile = require('jsonfile')

// Config
var file = './components.json'


jsonfile.readFile(file, function(err, obj) 
{
	if (err) 
		return console.error("Fehler beim Einlesen der Datei: " + err)
	
	db.deleteAllComponents(function(err) 
	{
		if (err) return console.error("Fehler beim löschen aus der Datenbank: " +err);
		else auswertung(obj);
	});
})

function auswertung(obj)
{
	obj.forEach(function(value, index)
	{
		console.log("Auswertung Index " + index);
		parser(value.path, function(err, component) 
		{
			if (err) return console.error("Error: " + err);
			component.name = value.name;	
			db.insertComponent(component, function(err, data){
				if (err) console.log(err);
			})
		});
	});
	showData();
}

function showData()
{
	db.components.find({}, function(err, data) {
		if (err) console.error(err);
		console.log(data);
		//db.connection.close();
	});
}