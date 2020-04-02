console.log('Server is up');
//mongodb+srv://<username>:<password>@cluster0-n1dni.mongodb.net/test
const express = require('express');
const app = express();

var path = require('path');
var bodyParser = require('body-parser');
//var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var assert = require('assert');
//var hbs = require('express-handlebars');
//var url ='mongodb://localhost:27017/meetings'; //url of database

//set engine to handlebars
//app.engine('hbs', hbs({extname: 'hbs'}))

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
app.set('view engine', 'pug');

// for parsing url encoded bodies 
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// for parsing application/json
app.use(express.json()) 

// serve files from the public directory
app.use(express.static('public'));

// start the server listening on 8080
app.listen(8080, () => {
  console.log('go to http://localhost:8080/ to view the welcome page');
});

// serve the welcomePage when upon request at server url
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/welcomePage.html');
});

// decide what to do upon recieving post request from form on welcome page
  app.post('/', (req, res) => {
    console.log("recieved login request");
      
       /* response = {
         student:req.body.student,
       } */
      
       var studentName = req.body.student;
       //console.log(studentName); //dsfsad
       
       MongoClient.connect(url, function(err, db) {
        if (err)  { console.log("login failed: student not found");
                    res.status(400).send( studentName + ' not found');};
        var dbo = db.db("Students");
        var query = { name:  studentName};
        dbo.collection("Names").find(query).toArray(function(err, result) {
          console.log('querying database...')
          if(result[0] == undefined){
            console.log("login failed: student not found");
            res.status(400).send( studentName + ' not found');
            return;
          }
          console.log(result[0].name);
          if (studentName === result[0].name) {
            //todo send name to main.html 
            res.sendStatus(200);
          } else {
            console.log("login failed: student not found");
            res.status(400).send( studentName + ' not found');
            //res.redirect('/');
          };
          db.close();
        });
      });
    });
 
//view to render when a parent has logged in with student name
//sends the students name as a param to the view
  app.get('/meetings/:studName', (req, res) => {
    console.log(req.originalUrl)
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Students");
      dbo.collection("Meetings").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0], typeof result[0]);
        db.close();
        res.render('meetings', {output: req.params.studName, result});
      });
    });
    //res.render('meetings', {output: req.params.studName});
  });

  app.post('/add', (req, res) => {
    var student = req.body.student;
    var times = req.body.time;
    var teacher = req.body.teacher;
    console.log('adding ' + student + ' ' + times + ' ' + teacher+ 'to db');
    //console.log(teacher, typeof teacher, times, typeof times)

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Students");
      var myquery = {hour:req.body.time};
      var newvalues = { $set: {[teacher]: req.body.student} };
      dbo.collection("Meetings").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log(res.modifiedCount + " document updated");
        db.close();
      });
    });

    res.end();
  });

  app.post('/delete', (req, res) => {
    var student = req.body.student;
    var times = req.body.time;
    var teacher = req.body.teacher;
    console.log('in delete ' + student + ' ' + times + ' ' + teacher);
    console.log(teacher, typeof teacher, times, typeof times)

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Students");
      var myquery = {hour:req.body.time};
      var newvalues = { $set: {[teacher]: "available"} };
      dbo.collection("Meetings").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log(res.modifiedCount + " document updated");
        db.close();
      });
    });

    res.end();
  });