var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log('using res.send')
  res.send('respond with a resource api');
});


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


router.get('/username', function(req, res){
    req = JSON.stringify(req);
    console.log("req is: " + req);
	var qr = 'select username from users';
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    results1 = JSON.stringify(results);
    console.log("results1: " + results1);
    res.send(results1);
	});
});

module.exports = router;