var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log('using res.send')
  res.send('respond with a resource test');
});

router.get('/t2', function(req, res, next) {
  console.log('using res.render')
  res.render('index', { title: 'Express index testtttt' });
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

router.get('/data', function(req, res){
	var qr = 'select * from users';
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    console.log("rendering test db conection." + results);
    results1 = JSON.stringify(results);
    console.log("rendering test db conection 1." + results1);
    results2 = JSON.parse(results1);
    console.log("rendering test db conection 2" + results2);


		res.render('index', {
			title: "This is a test page to render DB queries",
      content1: results1,
      content2: results2
		});
	});
});

router.get('/username/:id', function(req, res){
 
	var qr = `select username from users where id=${id}`;
	// var context = {};
	connection.query(qr, function(error, results, fields){
    if(error) throw error;
    results1 = JSON.stringify(results);
    console.log(results1)
    res.send(results1)
    
	});
});
router.get('/password/:id', function(req, res){
  console.log(req)
	var qr = `select password from users where id=${req.id}`;
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    results1 = JSON.stringify(results);
		res.send(results1)
	});
});

router.get('/wifimacaddr', function(req, res){
	var qr = 'select wifimacaddr from users where id=1';
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    results1 = JSON.stringify(results);
		res.send(results1)
	});
});

router.get('/accountType', function(req, res){
	var qr = 'select accountType from users where id=1';
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    results1 = JSON.stringify(results);
		res.send(results1)
	});
});


router.get('/all', function(req, res){
	var qr = 'select * from users';
	// var context = {};
	connection.query(qr, function(error, results, fields){
		if(error) throw error;
    results1 = JSON.stringify(results);
    results2 = JSON.parse(results1);
		res.render('index', {
			title: "all",
      content1: results1,
  
		});
	});
});


module.exports = router;
