"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// MongoDB
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect('mongodb://localhost/csvajax1');

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

/* Specifying the name of the format for the file names */
app.param('entry', function(req, res, next, entry) {
    if (entry.match(/^[a-z_]\w*\.csv$/i)) {
        req.entry = entry;
    } else {
        next(new Error(`<${entry}> is not an allowed format`));
    }
    next();
});

const Input = require('./models/db-schema');

/* Create a new entry in the DB with the given name on the request
   If already 4 entries exists, we delete the last one */
app.get('/mongo/:entry', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 4) {
            Input.find({ name: docs[3].name }).remove().exec();
        }
    });
    let input = new Input({
        "name": req.entry,
        "content": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Error occurred:\n${err}`);
            return err;
        }
        console.log(`Saved: ${input}`);
    });
});

/* Returning an array with all the entries that the DB has as response */
app.get('/find', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        res.send(docs);
    });
});

/* Returning as a response the entry corresponding to the specified name on the request */
app.get('/findByName', function(req, res) {
    Input.find({
        name: req.query.name
    }, function(err, docs) {
        res.send(docs);
    });
});


app.get('/cleanDB', (request, response) => {
    Input.remove({}, function (){
      console.log("db cleaned");
    });
});
  




