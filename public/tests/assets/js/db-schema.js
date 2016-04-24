(function() {
    "use strict";
    const util = require('util');
    const mongoose = require('mongoose');

    /*Creating the schema*/
    const InputSchema = mongoose.Schema({
        "name": {
            type: String,
            unique: true
        },
        "data": String
    });

    /*Creamos el modelo de datos Input a partir del esquema ya creado*/
    const Input = mongoose.model("Input", InputSchema);

    /*Creamos los tres ejemplos iniciales*/
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

    /*Añadimos los ejemplos a la BD*/
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

    /*Esperamos a que se creen los ejemplos*/
    Promise.all([promise1, promise2, promise3]).then((value) => {
        console.log("Se han creado las entradas:\n" + util.inspect(value, {
            depth: null
        }));
    }, (reason) => {
        console.log("No se han podido crear las entradas:\n" + reason);
    });

    module.exports = Input;
})();
