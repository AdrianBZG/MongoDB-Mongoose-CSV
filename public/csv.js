// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

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
    let fileName = document.getElementById("fileName");
    
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
        $.get("/mongo/" + $("#storedInputName").val(),
          { content: original.value }
        );
    });
    
    $("#cleanDB").click( () => {
      $.get("/cleanDB");
      $("#storedButtons").empty();
      // No hace falta esto ya, se rellenara con fillStoredInputs
      //$("#storedButtons").html('<button class ="storedInput" type="button">Me he creado</button>');
      alert("The MongoDB 'csv' database has been cleaned up!");
    });
    
    
    /* botones para rellenar el textarea */
    $('button.example').each((_, y) => {
          $(y).click(() => {
          /* Buscamos la entrada de la BD especificada por el nombre del botón
          y colocamos el contenido de dicha entrada de la BD en el textarea*/
          $.get("/findByName", {
            name: $(y).text()
          },
          (data) => {
          $("#original").val(data[0].content);
        });
      });
    });
        
    /*Buscamos las entradas guardadas en la BD para mostrar los botones
    correspondientes con su nombre asociado*/
    $.get("/find", {}, (data) => {
      for (var i = 0; i < 4; i++) {
        if (data[i]) {
          $('button.example').get(i).className = "example";
          $('button.example').get(i).textContent = data[i].name;
        }
      }
    });
        
    /*Guardamos una nueva entrada en la BD, con el nombre especificado
    por el usuario.*/
    $("#saveDB").click(() => {
      if (window.localStorage) localStorage.original = original.value;
      $.get("/mongo/" + $("#storedInputName").val(), {
        content: $("#original").val()
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
