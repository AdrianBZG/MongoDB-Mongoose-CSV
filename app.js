"use strict";



const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');


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


  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/chuchu');
  const csvSchema = mongoose.Schema({ 
    "bottonName" : String,
    "text" : String
  });

  const Csv = mongoose.model("Csv", csvSchema);

  let c1 = new Csv({"rank":"ace", "suit":"spades ♠",   "chuchu": [{a: "hello", b: "world!"}]});
  let c2 = new Csv({"rank":"2",   "suit":"hearts ♥",   "chuchu": [{a: "hola", b: "mundo"}]});


  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c1}`);
  });

  let p2 = c2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c2}`);
  });


  Promise.all([p1, p2]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
