
const express = require('express');
var md5 = require('md5');
var wifimacaddress = 'abc123';
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



app.get('/api/:uid/:upw/:wma', function (req, res, next) {
  var uidx = req.params.uid.toString()
  var qr = `select * from vdm_person where email='${uidx}'`;

  connection.query(qr, function(error, results, fields){
    res.send("check console ");
    results1 = JSON.stringify(results);
    results2 = JSON.parse(results1);
    console.log('results2[0]:', results2[0]);
    console.log('username req:', req.params.uid);
    console.log('username db:', results2[0].EMAIL);
    console.log('password:', results2[0].PASSWORD);
    console.log('req.params.upw:', req.params.upw);
    console.log('password md5:', md5(req.params.upw));
    console.log('results2[0].SECRET_QUESTION:', results2[0].SECRET_QUESTION);
    console.log('req.params.wma:', req.params.wma);
  });

  });
  
  app.post('/api/:uid/:upw/:wma', function(req, res){
    var uidx = req.params.uid.toString()
    var qr = `select * from vdm_person where email='${uidx}'`;

    connection.query(qr, function(error, results, fields){

      results1 = JSON.stringify(results);
      results2 = JSON.parse(results1);

      if(results2.length==0){
        res.send("invalid username ");
      }

      if(results2[0].PASSWORD != md5(req.params.upw)  ){
        res.send("invalid password");
      } 

      if(wifimacaddress!=req.params.wma){
        res.send("wifimacaddress not registered");
      } 

        
      res.send("valid login! ");
       
      
      
      
    });
  });


