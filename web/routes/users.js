var express = require('express');
var router = express.Router();

/* set up sql connection */
var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

/* throw an error if sql connect fails. it should fail a couple times in docker
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource...');
});

router.post('/', function(req, res, next) {
  res.send('Testing to get data from backend');
});


router.post('/u', function(req, res, next) {
  res.send('Testing post  U');
});

router.get('/data', function(req, res, next) {
  res.send('Testing get  Data');
});
	
router.get('/datacon', function(req, res, next) {
  res.send('conected to: ' + connection.threadId);
});

/* Get routes below */


router.get('/dataux', function(req, res){
	var uxQuery = 'select * from users';
	// var context = {};
	connection.query(uxQuery, function(error, results, fields){
		if(error) throw error;
		console.log("rendering characters page . . .");

		res.render('dataux', {
			title: "UX Page",
			results: results
		});
	});
});

router.get('/datau', function(req, res, next){

    var q = 'SELECT * from users';

    connection.query(q, function(error, results, fields){
		if(error) throw error;
		console.log("rendering home page . . .");
	        res.send('sending results:' + results );
	    	res.send('home', {
			title: "User list from  DB",
			results: results,
			username: username
		});
	});
});

router.get('/dataua', function(req, res, next){

    var q = 'SELECT * from users';

    connection.query(q, function(error, results, fields){
                if(error) throw error;
                console.log("rendering home page . . .");
                res.send('home', {results: results} );
        });
});

router.get('/dataub', function(req, res, next){

    var q = 'SELECT * from users';

    connection.query(q, function(error, results, next){
                if(error) throw error;
                console.log("rendering home page . . .");
                res.send('home' + {results: results} );
        });
});

module.exports = router;
