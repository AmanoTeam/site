$(function(){
  $(".fixed-action-btn").hide();

  $(window).scroll(function(){
    if ($(this).scrollTop() > 650) {
      $(".fixed-action-btn").fadeIn();
    } else {
      $(".fixed-action-btn").fadeOut();
    }
  });
});
