
const express = require('express');

var app = express();

app.listen(8080, function () {
    console.log('Ahoy!');
});

app.get('/usr', function (req, res, next) {
  res.send('ok');
    console.log('just looking');

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

connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});



app.get('/usr/:uid/:upw', function (req, res, next) {
  res.send(req.params.id);
    console.log('Request Type:', req.method);
    console.log('ID:', req.params.id);
    console.log('IT:', req.params.it);
  });
  
  app.post('/usr/:uid/:upw', function (req, res, next) {
    res.send(req.params.id);
    console.log('Request Type:', req.method);
    console.log('ID:', req.params.id);
    console.log('IT:', req.params.it);
  });