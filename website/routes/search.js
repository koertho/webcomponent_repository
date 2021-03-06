var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	res.render('search',{
		"title": "Suche"
	});
})

router.get('/filter', function(req, res, next) {
	
	var db = req.db;
	var components = db.get('components');
	
	var cat = req.query.cat;
	var datatype = req.query.datatype;
	
	switch (cat) {
		case "properties":
				var search = components.find({"properties.type": datatype});
			break;
		case "methods":
			if (req.query.in_out == "params") {
				var search = components.find({"methods.params.type.names": datatype});
			}
			else if(req.query.in_out == "return")
			{
				var search = components.find({"methods.returns.type.names": datatype});
			}
			break;
		case "smartComposition":
			switch (req.query.pubsub)
			{
				case "publish":
					var search = components.find({"publish.type": datatype});
					break;
				case "subscribe":
					var search = components.find({"subscription.type": datatype});
					break;
				case "topic":
					var query = req.query.search;
					var search = components.find({
						$or: [{"subscription.name": query}, {"publish.name": query}]
					})
					break;
			}
	}
	search.on('error', function(err){
		res.send({}); 
	});
	search.on('success', function(doc){
		res.send(doc); 
	});
});

router.get('/query', function(req, res, next) {
	var db = req.db;
	var components = db.get('components');
	
	var search = components.find({
		$text: {
			$search: req.query.search_query
		}
	});
	search.on('error', function(err){
		res.send({}); 
	});
	search.on('success', function(doc){
		res.send(doc); 
	});
});


module.exports = router;


