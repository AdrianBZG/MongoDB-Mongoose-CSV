// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


//

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

/* Dump the table result into the HTML */
const fillTable = (data) => {
  $("#finaltable").html(_.template(resultTemplate, { rows: data.rows }));
};

/* Dump into the input textarea
 * #original is the content of the fileName file */
const dump = (fileName) => {
  $.get(fileName, function (data) {
    $("#original").val(data);
  });
};

const handleFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.target.files;

  var reader = new FileReader();
  reader.onload = (e) => {
    $("#original").val(e.target.result);
  };

  reader.readAsText(files[0]);
}

/* Drag and drop: The dragged file will be dumped into the input textarea */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;

  var reader = new FileReader();
  reader.onload = (e) => {

    $("#original").val(e.target.result);
    evt.target.style.background = "white";
  };
  reader.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "yellow";
}

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }

    /* AJAX request to calculate the result table */
    $("#parse").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/csv",
          { textocsv: original.value },
          fillTable,
          'json'
        );
    });
    
    $("#saveDB").click( () => {
      if (window.localStorage) localStorage.original = original.value;
        $.get("/saveDB",
          { textocsv: original.value },
          fillTable,
          'json'
        );
    });
    
    $("#cleanDB").click( () => {
      //mongoose.connection.db.dropCollection('csvs', function (err) {
      //  if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
      //});
      alert("The MongoDB 'csv' database has been cleaned up!");
    });
    
    
   /* Buttons to fill the textarea */
   $('button.example').each( (_,y) => {
     $(y).click( () => {
       dump(`${$(y).text()}.txt`); 
     });
   });

    // Setup the drag and drop listeners.
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);
 });
})();
