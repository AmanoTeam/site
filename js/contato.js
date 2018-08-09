var $button = "<a class='btn blue darken-2 waves-effect waves-light' name='contatoBtn' id='sendMessage'>Enviar</a>";

$("#sendMessage").click(function(event) {
  if ($("#name").val() === "") {
    swal("Preencha seu nome", "Por favor preencha o seu nome.", "error");
  } else if ($("#texto").val() === "") {
    swal("Escreva sua mensagem", "Por favor escreva sua mensagem.", "error");
  } else {
      $("#sendMessage").replaceWith("<a class='white-text' id='sendMessage'>Enviando...</a>");
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
            swal(data, "A sua mensagem foi enviada para a nossa equipe!", "success");
          }
        }
      );
    }
  }
);
