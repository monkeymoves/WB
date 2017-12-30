const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app =express()
const port = 8000;
const bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs')
app.use(expressLayouts);



// use body parser
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

const router = require('./app/routes');
app.use('/', router);

//set static files
app.use(express.static(__dirname + '/public'));


//start server
app.listen(port, ()=>{
    console.log('app started');
})




// mongodb.MongoClient.connect(uri, function(err, db) {
//   if(err) throw err;
//   dbHIA+="<h1>MongoDB Example</h1>";
//   dbHIA+="Connecting to db "+process.env.DB+"<br />";
// });