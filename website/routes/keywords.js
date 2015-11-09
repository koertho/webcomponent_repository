var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
	var pub_keys = db.get('publish_keys');
	var sub_keys = db.get('subscription_keys');
	res.render('keywords', {
		"publish_keys": pub_keys,
		"subscripe_keys": sub_keys
	})
});

module.exports = router;