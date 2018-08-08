$("#sendMessage").click(function(event) {
  $.ajax(
    {
      type: 'POST',
      url: 'http://xn--f77h6a.ml/api/',
      data: {
        name: $('#nome').val(),
        username: $('#username').val(),
        assunto: $('#assunto').val()
        text: $('#text').val()
      },
      success: function(data) {
        $('#sendMessage').write(data);
      }
    }
  )
})
