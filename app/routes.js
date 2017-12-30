 // require dependencies
var express = require('express');
var path    = require('path');
const bodyParser = require('body-parser');
var mongodb = require('mongodb');
let wellbeingGoals = require('./wellbeingGoals')
// create & export our router object
var router = express.Router();
module.exports = router;
//set env variables for db - db connect Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
require('dotenv').config({path: './'})
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB; 

// route for our homepage
router.get('/', function(req, res) {
  res.render('pages/index');
});

// route for our about page
router.get('/about', function(req, res) {
  var users = [
    { name: 'Holly', email: 'holly@scotch.io', avatar: '/img/planet.jpg'},
    { name: 'Chris', email: 'chris@scotch.io', avatar: '/img/disc.jpg'},
    { name: 'Ado', email: 'Ado@scotch.io', avatar: 'http://placekitten.com/500/500'},
    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: 'http://placekitten.com/700/700'}
  ];

  res.render('pages/about', { users: users });
});

router.get('/contact', function (req, res) {
  res.render('pages/prosperous', { user: "luke", title: wellbeingGoals.WBprosperous.name, content: wellbeingGoals.WBprosperous.content });
});


router.post('/contact', function (req, res) {

  var myobj = {
    projectID: "Newport Wetlands", address: "taffs", positive: req.body.positive, negative: req.body.negative,
    mitigation: req.body.mitigation, rank: req.body.rank
  };
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var db = client.db('glitch_db');
    db.collection("songs").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
  res.send(myobj);
  // res.send('Thanks for contacting us, ' + req.body.positive + '! We will respond shortly!' + JSON.stringify(myobj)); 
});

