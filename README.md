# Assignment: Comma separated values (CSV) using AJAX

![AJAX Image](http://www.svgopen.org/2008/papers/82-Web_Mapping_and_WebGIS_do_we_actually_need_to_use_SVG/ajax.jpg "AJAX Image")<br>
[![Build Status](https://travis-ci.org/LambdaCode/AJAX-ECMA6-Modules-Files.svg?branch=master)](https://travis-ci.org/LambdaCode/AJAX-ECMA6-Modules-Files)

## INFO:

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
![Preview](http://i.imgur.com/s2DMXyr.png?1 "Preview")


## HEROKU DEPLOYMENT
Application: https://csvajaxrateam.herokuapp.com/ <br>
Testing: https://csvajaxrateam.herokuapp.com/tests

## USED TECHNOLOGIES
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
- PAAS Deployment (Heroku) <br>
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

* [Assignment description](https://campusvirtual.ull.es/1516/mod/page/view.php?id=189369)


### Validated by www.W3.org (validator.w3.org)
Result: 0 errors and 0 warnings.
![W3 Validation](http://i.imgur.com/hqHRNup.png?1 "W3 Validation")

### JSHint Metrics (http://jshint.com/)
Result: 0 errors and 0 warnings.
![JSHint Metrics](http://i.imgur.com/4zDVjyW.png?1 "JSHint Metrics")

