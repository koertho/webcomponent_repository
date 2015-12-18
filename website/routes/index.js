var express = require('express');
var fs = require('fs');
var router = express.Router();

var componentList = function(req, res, next) {
	var db = req.db;
	var components = db.get('components');
	components.find({},{}, function(err, data) {
		res.render('components', { 
			"title": 'Komponenten',
			 "components": data
		});
	});
};


router.get('/', componentList);
router.get('/components', componentList);

router.get('/components/:component', function(req, res, next) {
	var db = req.db;
	var components = db.get('components');
	components.find({name: req.params.component}, function(err, docs){
		if (err) console.err("Fehler beim Abfragen der Komponente aus der Datenbank: " + err);
		res.render('component',{
			"component": docs[0]
		});
	});
	
})

router.get('/download', function(req, res, next) {
	res.download(decodeURI(req.query.path));
});

module.exports = router;