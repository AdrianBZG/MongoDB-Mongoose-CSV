"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// MongoDB
const util = require('util');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect('mongodb://localhost/csvajax1');


/*
// Creating CSV schema
const CsvSchema = mongoose.Schema({ 
  "name" : String,
  "text" : String,
});

// Creating the Model
const Csv = mongoose.model("Csv", CsvSchema);
*/

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

const DB = require('./models/db-schema');

/*Creamos una entrada nueva en la BD con el nombre recibido en el request
  Si ya hay 4 entradas, se borra la última*/
app.get('/mongo/:entry', function(req, res) {
    DB.find({}, function(err, files) {
        if (err)
            return err;
        if (files.length > 3) {
            DB.find({ name: files[3].name }).remove().exec();
        }
    });
    console.log("Entry" + req.entry);
    let input = new DB({
        "name": req.entry,
        "data": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Errors occurs:\n${err}`);
            return err;
        }
        console.log(`Saved happily: ${input}`);
    });
});


app.get('/input/:fileName', function(req, res) { 
  console.log("Looking for: " + fileName); /* input1.txt*/
  var file = Csv.find({name: fileName});
  res.send(file.text); 
});

app.get('/csvCount', function(req, res) {
    Csv.find({}, function (csvs) {
      res.send(csvs.length);
    });
})


app.get('/cleanDB', (request, response) => {
    mongoose.connect('mongodb://localhost/csvajax1');
    
    Csv.remove({}, function (){
      mongoose.connection.close();
      console.log("db cleaned");
    });
});

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
  




