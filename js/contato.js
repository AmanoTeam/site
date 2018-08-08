$("#sendMessage").click(function(event) {
  $.ajax(
    {
      type: 'POST',
      url: 'http://amanosite.000webhostapp.com/contact/',
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
