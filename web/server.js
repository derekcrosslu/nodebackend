
const express = require('express');

var app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


app.listen(3000, function () {
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



app.get('/usr/db/:uid/:upw/:wma', function (req, res, next) {
  res.send(req.params.upw);
    console.log('Request Type:', req.method);
    console.log('username:', req.params.uid);
    console.log('password:', req.params.upw);
    console.log('wifimacaddr:', req.params.wma);

  });
  
  app.post('/usr/db/:uid/:upw/:wma', function(req, res){
    var uidx = req.params.uid.toString()
    var qr = `select * from users where username='${uidx}'`;

    connection.query(qr, function(error, results, fields){

      results1 = JSON.stringify(results);
      results2 = JSON.parse(results1);

      if(results2.length==0){
        res.send("invalid username ");
      }

      if(results2[0].password != req.params.upw  ){
        res.send("invalid password");
      } 

      if(results2[0].wifimacaddr!=req.params.wma){
        res.send("wifimacaddress not registered");
      } 

        
      res.send("valid login! ");
       
      
      
      
    });
  });


