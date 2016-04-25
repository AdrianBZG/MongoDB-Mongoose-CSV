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

/*Especificamos el formato del nombre de los ficheros de entrada*/
app.param('entrada', function(req, res, next, entrada) {
    if (entrada.match(/^[a-z_]\w*\.csv$/i)) {
        req.entrada = entrada;
    } else {
        next(new Error(`<${entrada}> no casa con los requisitos de 'entrada'`));
    }
    next();
});

const Input = require('./models/db-structure');

/*Creamos una entrada nueva en la BD con el nombre recibido en el request
  Si ya hay 4 entradas, se borra la última*/
app.get('/mongo/:entrada', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 4) {
            Input.find({ name: docs[3].name }).remove().exec();
        }
    });
    let input = new Input({
        "name": req.entrada,
        "content": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input}`);
    });
});

/*Se devuelve un array con todas las entradas de la BD como respuesta*/
app.get('/find', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        res.send(docs);
    });
});

/*Se devuelve como respuesta la entrada correspondiente al nombre
  especificado en la request*/
app.get('/findByName', function(req, res) {
    Input.find({
        name: req.query.name
    }, function(err, docs) {
        res.send(docs);
    });
});


app.get('/cleanDB', (request, response) => {
    mongoose.connect('mongodb://localhost/csvajax1');
    
    Input.remove({}, function (){
      mongoose.connection.close();
      console.log("db cleaned");
    });
});
  




