(function() {
    "use strict";
    const util = require('util');
    const mongoose = require('mongoose');

    /*Creating the schema*/
    const CsvSchema = mongoose.Schema({
        "name": {
            type: String,
            unique: true
        },
        "data": String
    });

    //Creating the model based on the previously created schema
    const Input = mongoose.model("Input", CsvSchema);

    // Create the three examples input
    let input1 = new Input({
        "name": "input1.csv",
        "data": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\\"Reilly", "7,2"`
    });
    let input2 = new Input({
        "name": "input2.csv",
        "data": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\\"Reilly", "7,2"     "13/02"`
    });
    let input3 = new Input({
        "name": "input3.csv",
        "data": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

    // Creating promises for saving the examples
    let promise1 = input1.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input1}`);
    });

    let promise2 = input2.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input2}`);
    });

    let promise3 = input3.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input3}`);
    });

    /*wait for all promises*/
    Promise.all([promise1, promise2, promise3]).then((value) => {
        console.log("Se han creado las entradas:\n" + util.inspect(value, {
            depth: null
        }));
    }, (reason) => {
        console.log("No se han podido crear las entradas:\n" + reason);
    });

    module.exports = Input;
})();
