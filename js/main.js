// Set up modals
$("#amanobot-a").animatedModal({color: "#0C1020", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#brdotml-a").animatedModal({color: "#111", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#duckpy-a").animatedModal({color: "#DA4A26", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#eduurobot-a").animatedModal({color: "#C90000", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#lyricspy-a").animatedModal({color: "#000", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#passwordrobot-a").animatedModal({color: "#355BCF", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#tgbackup-a").animatedModal({color: "#31A8F6", animatedIn: "zoomIn", animatedOut: "fadeOut"});
$("#userlixo-a").animatedModal({color: "#8C5AD3", animatedIn: "zoomIn", animatedOut: "fadeOut"});

window.onload = function () {
  $("#loading").fadeOut(500, function(){
    $(this).remove();
  });
};

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a[href*="#"]a[class*="smooth-scroll"]').click(function() {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html, body").animate({
        scrollTop: (target.offset().top - 56)
      }, 1500, "easeInOutExpo");
      return false;
    }
    else {
      $("html, body").animate({
        scrollTop: (0)
      }, 1500, "easeInOutExpo");
      return false;
    }
  });

})(jQuery); // End of use strict
