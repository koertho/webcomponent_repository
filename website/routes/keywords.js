var express = require('express');
var router = express.Router();





router.get('/', function(req, res, next) {
	var db = req.db;
	var keywords = db.get('keywords');
	keywords.find({}, function(err, keys){
		if (err) console.err("Fehler beim Abfragen der keys aus der Datenbank: " + err);
		res.render('keywords', {
			"title": "Keywords",
			"keys": keys
		});
	});
});

router.get('/:key', function(req, res, next) {
	var db = req.db;
	var key = req.params.key;
	var components = db.get('components');
	
	components.find({
		"publish": {
			"$elemMatch":{
				"name": key
	}}}, function(err, publish)
	{
		if (err) console.err("Fehler beim Suchen nach Komponenten in der Datenbank: " + err);
		components.find({
			"subscription": {
				"$elemMatch":{
					"name": key
		}}}, function(err, subscription)
		{
			if (err) console.err("Fehler beim Suchen nach Komponenten in der Datenbank: " + err);
			res.render('keyword',{
				"title": key,
				"key": key,
				"publish": publish,
				"subscription": subscription
			});
		});
	});
	
})

module.exports = router;