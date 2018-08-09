$("#sendMessage").click(function(event) {
    $("#sendMessage").replaceWith("<a id='sendMessage'>Enviando...</a>");
    $.ajax(
      {
        type: "POST",
        url: "https://amanosite.000webhostapp.com/contact/",
        data: {
          name: $("#name").val(),
          username: $("#username").val(),
          assunto: $("#assunto").val(),
          text: $("#texto").val(),
        },
        success: function(data) {
          $("#sendMessage").replaceWith(data);
        }
      }
    );
  }
);
