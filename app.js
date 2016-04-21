"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// MongoDB
const util = require('util');
const mongoose = require('mongoose');

// Creating CSV schema
const CsvSchema = mongoose.Schema({ 
  "name" : String,
  "text" : String,
});

// Creating the Model
const Csv = mongoose.model("Csv", CsvSchema);


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

app.get('/cleanDB', (request, response) => {
    mongoose.connect('mongodb://localhost/csvajax1');
    
    Csv.remove({}, function (){
      mongoose.connection.close();
      console.log("db cleaned");
    });
});

// RODOLFO
app.get('/saveDB', (request, response) => {

    mongoose.connect('mongodb://localhost/csvajax1');
    let c1 = new Csv({"name":"input", "text": request.query.textocsv});
  
    var promise;
    c1.save(function (err) {
        if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
        console.log(`Saved: ${c1}`);
    }).then(promise = Csv.find({}).limit(4));
  
    promise.then(function (doc) {
      console.log(doc.length);
      mongoose.connection.close();
    });

    response.send({ "rows": calculate(request.query.textocsv) }); 
});
  




