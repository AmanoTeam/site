$("#texto").keyup(function(event) {
  if ($(this).val().length > 512) {
    $(this).val($(this).val().substring(0, 512));
  }
});

$("#submit").click(function(event) {
  if ($("#name").val() === "") {
    swal("Preencha seu nome", "Por favor preencha o seu nome.", "error");
  } else if ($("#texto").val() === "") {
    swal("Escreva sua mensagem", "Por favor escreva sua mensagem.", "error");
  } else {
      document.getElementById('submitted').innerHTML = "sending...";
      $.ajax(
        {
          type: "POST",
          url: "https://api.amanoteam.ml/sendcontact/",
          data: {
            name: $("#name-input").val(),
            username: $("#username-input").val(),
            subject: $("#subject-input").val(),
            text: $("#message-input").val(),
          },
          success: function(data) {
            document.getElementById('submitted').innerHTML = data;
          }
        }
      );
    }
  }
);
