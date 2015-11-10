var express = require('express');
var router = express.Router();





router.get('/', function(req, res, next) {
	var db = req.db;
	var keywords = db.get('keywords');
	keywords.find({}, function(err, keys){
		if (err) console.err("Fehler beim Abfragen der keys aus der Datenbank: " + err);
		res.render('keywords', {
			"keys": keys
		});
	});
});

module.exports = router;