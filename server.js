console.log('Server is up');

const express = require('express');
const app = express();

var bodyParser = require('body-parser');

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
        student:req.query.student
     }; */
     /* response = {
       student:req.body.student,
     } */
     var studentName = req.body.student;
     console.log(studentName); //dsfsad
     //res.redirect('/main.html');
     //console.log(response); //{ student: 'dsfsad' }
     //res.end(JSON.stringify(response)); //sends to homepage
     /* console.log(response);
     res.end(JSON.stringify(response)); */
    if (studentName != "a") {
      //todo send name to main.html 
      res.redirect('/main.html');
    } else {
      console.log("login failed: student not found");
      res.status(400).send( studentName + ' not found');
    };
  });