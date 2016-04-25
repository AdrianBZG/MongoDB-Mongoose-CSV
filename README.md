# Assignment: Comma separated values (CSV) + AJAX and MongoDB

![AJAX Image](http://www.svgopen.org/2008/papers/82-Web_Mapping_and_WebGIS_do_we_actually_need_to_use_SVG/ajax.jpg "AJAX Image")<br>
![MongoDB Logo](http://cdn.rancher.com/wp-content/uploads/2016/01/26001728/mongodb-logo.png "MongoDB Logo")<br>
[![Build Status](https://travis-ci.org/LambdaCode/AJAX-ECMA6-Modules-Files.svg?branch=master)](https://travis-ci.org/LambdaCode/AJAX-ECMA6-Modules-Files)


## INFO:

### AVISO A LOS EVALUADORES:

Si está caído el despliegue en Cloud9 mándame un mensaje a WhatsAPP o Telegram: +34 676024363 y lo enciendo.
También puedes mandar un Issue.

### What is MongoDB?

MongoDB is a cross-platform document-oriented database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas (MongoDB calls the format BSON), making the integration of data in certain types of applications easier and faster. <br>

### jQuery.get( url [, data ] [, success ] [, dataType ] )
* url
  * Type: String
  * A string containing the URL to which the request is sent.
* data
  * Type: PlainObject or String
  * A plain object or string that is sent to the server with the request.
* success
  * Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
  * A callback function that is executed if the request succeeds. 
    Required if `dataType` is provided, but you can use `null` or `jQuery.noop` as a placeholder.
* dataType
  * Type: String
  * The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).

### jQuery.get( [settings ] )
* settings
  * Type: PlainObject
  * A set of key/value pairs that configure the Ajax request. 
  * All properties except for `url` are optional. 
  * A default can be set for any option with `$.ajaxSetup()`.

This is a shorthand Ajax function, which is equivalent to:

```javascript
$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
```

The success callback function is passed the returned data, which will be an XML root element, text string, JavaScript file, or JSON object, depending on the MIME type of the response. It is also passed the text status of the response.

## PREVIEW
![Preview](http://i.imgur.com/Yba7Jva.png?1 "Preview")


## C9.IO DEPLOYMENT
Application: https://adrian-private-c9-adrianbzg.c9users.io/ <br>
Testing: https://adrian-private-c9-adrianbzg.c9users.io/tests

## USED TECHNOLOGIES
- MongoDB <br>
- jQuery <br>
- AJAX <br>
- SASS <br>
- Underscore <br>
- Karma + Mocha + Chai + Sinon <br>
- File Handling <br>
- RegExp <br>
- Views (ExpressJS) <br>
- ECMA 6 <br>
- Event Handling <br>
- PAAS Deployment (Cloud9) <br>
- Version control + Collaboration (Git) <br>

## DEVELOPERS

### Adrián Rodríguez Bazaga
  - Email: arodriba@ull.edu.es
  - [Personal page](http://adrianbzg.github.io)

### Rudolf Cicko
  - Email: alu0100824780@ull.edu.es
  - [Personal page](http://alu0100824780.github.io)

** Link to the subject "Procesadores de Lenguajes" (Language Processors):**

* [Procesadores de Lenguajes](https://campusvirtual.ull.es/1516/course/view.php?id=178)

** Link to the assignment description:**

* [Assignment description](https://campusvirtual.ull.es/1516/mod/page/view.php?id=191191)


### Validated by www.W3.org (validator.w3.org)
Result: 0 errors and 0 warnings.
![W3 Validation](http://i.imgur.com/hqHRNup.png?1 "W3 Validation")

### JSHint Metrics (http://jshint.com/)
Result: 0 errors and 0 warnings.
![JSHint Metrics](http://i.imgur.com/4zDVjyW.png?1 "JSHint Metrics")

