var mongo = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var url = "mongodb://127.0.0.1:27017/"

app.use(bodyParser.urlencoded({ extended: true }));

//To verify login for CRM USER
app.post('/verifyUser', function(req, res) {
	var usrID =  parseInt(req.body.UserId, 10);
	var pas = req.body.Password;
     var verified = "no";
     var query = {$and:[ {UID : usrID}, {Password : pas}]};
	mongo.connect(url,  {
          useNewUrlParser: true, useUnifiedTopology: true
          },function(err, db) {
               if (err) throw err;
               var dbo = db.db("CRMDatabase");
               dbo.collection("CRMUser").find(query).toArray(function(err, result) {
                    if (err) throw err;
                    if(result.length != 0){
                         verified = "yes";
                    }else{
                         verified = "no";
                    }
                    db.close();
                    if( verified == "no"){
                         console.log('User not verified, Login again with valid credentials');
                         return res.redirect('/startUser');
                    }else if(verified == "yes"){
                         console.log('User login successfull, moved to dashboard');
                         return res.sendFile( __dirname + '/FrontEnd/dashboard.html');
                    }
               });
     });
});


//To register user in database
app.post('/addUser', function(req, res) {
     var UID = parseInt(req.body.UserId, 10);
     var Name = req.body.Name;
     var Email = req.body.Email;
     var Phone = parseInt(req.body.Phone, 10);
     var Password = req.body.Password;
     var query = {"UID":UID,"Name":Name,"Email":Email,"Phone":Phone,"Password":Password}
     mongo.connect(url,  {
          useNewUrlParser: true, useUnifiedTopology: true
          },function(err, db){
               if (err) throw err;
               var dbo = db.db("CRMDatabase");
               dbo.collection("CRMUser").insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 User Added; Redirecting to login page");
                    db.close();
                    return res.redirect('./startUser');
               });
     });
});


//To register Customer in database
app.post('/addCustomer', function(req, res) {
     var CID = parseInt(req.body.CustomerId, 10);
     var Name = req.body.Name;
     var Email = req.body.Email;
     var Phone = parseInt(req.body.Phone, 10);
     var Address = req.body.Address;
     var Status = req.body.Status;
     var query = {"CID":CID,"Name":Name,"Email":Email,"Phone":Phone,"Address":Address, "Status":Status }
     mongo.connect(url,  {
          useNewUrlParser: true, useUnifiedTopology: true
          },function(err, db){
               if (err) throw err;
               var dbo = db.db("CRMDatabase");
               dbo.collection("CRMCustomer").insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 Customer Added; Redirecting to dashboard");
                    db.close();
                    return res.sendFile( __dirname + '/FrontEnd/dashboard.html');
               });
     });
});


//To open start page(login page) with both get and post request http://127.0.0.1:8080/startUser
app.get('/startUser', function(req, res){
     return res.sendFile( __dirname + '/FrontEnd/start.html');
});
app.post('/startUser', function(req, res){
     return res.sendFile( __dirname + '/FrontEnd/start.html');
});


//To open registration page with both get and post request at http://127.0.0.1:8080/registerUser
app.post('/registerUser', function(req, res){
     return res.sendFile(__dirname + '/FrontEnd/registration.html');
});
app.get('/registerUser', function(req, res){
     return res.sendFile(__dirname + '/FrontEnd/registration.html');
});

//To open registration page with request at http://127.0.0.1:8080/registerCustomer
app.post('/registerCustomer', function(req, res){
     return res.sendFile(__dirname + '/FrontEnd/registrationCustomer.html');
});


//Run the server at port 8080
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});