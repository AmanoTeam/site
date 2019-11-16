$("#message-input").keyup(function(event) {
  $("#message-label").removeClass("orange-text red-text");
  if ($(this).val().length > 512) {
    $(this).val($(this).val().substring(0, 512));
  }
});

$("#name-input").keyup(function(event) {
  $("#name-label").removeClass("red-text");
});

$("#contact-form").submit(function(event) {
  event.preventDefault();
  if ($("#message-input").val().length < 25) {
    document.getElementById("submitted").innerHTML = "<b>Your message can't be shorter than 25 characters.</b>";
    $("#message-label").removeClass("red-text");
    $("#message-label").addClass("orange-text");
  } else {
    document.getElementById("send-btn").innerText = "sending...";
    $.ajax({
      type: "POST",
      url: "https://api.amanoteam.ml/sendcontact/",
      data: {
        name: $("#name-input").val(),
        username: $("#username-input").val(),
        subject: $("#subject-input").val(),
        text: $("#message-input").val(),
      },
      success(data) {
        document.getElementById("submitted").innerText = data;
        document.getElementById("send-btn").innerText = "Send";
      }
    });
  }
});