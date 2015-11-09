var express = require('express');
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








/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(err,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;


