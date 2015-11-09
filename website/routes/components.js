var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
	var components = db.get('components');
	components.find({},{}, function(err, data) {
		res.render('components', { 
			"title": 'Komponenten',
			 "components": data
		});
	});
});

module.exports = router;