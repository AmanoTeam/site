$(function(){
    $(".fixed-action-btn").hide();

    $(window).scroll(function(){
        if ($(this).scrollTop() > 632) {
            $(".fixed-action-btn").fadeIn();
        } else {
            $(".fixed-action-btn").fadeOut();
        }
    });

    $(".fixed-action-btn").click(function(){
        $("html, body").animate({scrollTop : 0},800);
        return false;
    });
});
