"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// MongoDB
const util = require('util');
const mongoose = require('mongoose');

// Handling MongoDB connection

mongoose.connect('mongodb://localhost/csvajax1');
const csvSchema = mongoose.Schema({ 
  "name" : String,
  "text" : String
});

// Creating the Model
const Csv = mongoose.model("Csv", csvSchema);

module.exports = Csv;


app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render ('index', { title: "CSV Analyzer"} );
});

app.get('/csv', (request, response) => {
  response.send({ "rows": calculate(request.query.textocsv) });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});

// RODO
app.get('/saveDB', (request, response) => {
  let c1 = new Csv({"name":"input", "text": request.query.textocsv});
  
  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
  });
  
  Promise.all([p1]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });

  response.send({ "rows": calculate(request.query.textocsv) });
});



