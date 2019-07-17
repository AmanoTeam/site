$("#message-input").keyup(function(event) {
  $("#message-label").removeClass("orange-text red-text");
  if ($(this).val().length > 512) {
    $(this).val($(this).val().substring(0, 512));
  }
});

$("#name-input").keyup(function(event) {
  $("#name-label").removeClass("red-text");
});

$("#submit").click(function(event) {
  if ($("#name-input").val() === "") {
    document.getElementById("submitted").innerHTML = "<b>Please fill in your name.</b>";
    $("#name-label").addClass("red-text");
  } else if ($("#message-input").val() === "") {
    document.getElementById("submitted").innerHTML = "<b>Please type your message.</b>";
    $("#message-label").removeClass("orange-text");
    $("#message-label").addClass("red-text");
  } else if ($("#message-input").val().length < 25) {
    document.getElementById("submitted").innerHTML = "<b>Your message can't be shorter than 25 characters.</b>";
    $("#message-label").removeClass("red-text");
    $("#message-label").addClass("orange-text");
  } else {
      document.getElementById("submitted").firstChild.nodeValue = "sending...";
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
            document.getElementById("submitted").firstChild.nodeValue = data;
          }
        }
      );
    }
  }
);
