// Set up modals
$("#amanobot-a").animatedModal({ color: "#0C1020", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#brdotml-a").animatedModal({ color: "#111", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#customgram-a").animatedModal({ color: "#3C7DC2", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#duckpy-a").animatedModal({ color: "#DA4A26", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#eduurobot-a").animatedModal({ color: "#C90000", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#lyricspy-a").animatedModal({ color: "#000", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#passwordrobot-a").animatedModal({ color: "#355BCF", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#tgbackup-a").animatedModal({ color: "#31A8F6", animatedIn: "zoomIn", animatedOut: "fadeOut" });
$("#userlixo-a").animatedModal({ color: "#8C5AD3", animatedIn: "zoomIn", animatedOut: "fadeOut" });

window.onload = function() {
  $("#loading").fadeOut(500, function() {
    $(this).remove();
  });
};

// Smooth scrolling using jQuery easing
$("a[href*='#']a[class*='smooth-scroll']").click(function() {
  let target = $(this.hash);
  target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
  if (target.length) {
    $("html, body").animate({
      scrollTop: (target.offset().top - 55)
    }, 1500, "easeInOutExpo");
    return false;
  } else {
    $("html, body").animate({
      scrollTop: (0)
    }, 1500, "easeInOutExpo");
    return false;
  }
});

$(".navbar-toggler-icon").click(function() {
  if ($("div.navbar-collapse").hasClass("show")) {
    $("#mainNav").removeClass("mobile-navbar");
  } else {
    $("#mainNav").addClass("mobile-navbar");
  }
});

// Collapse Navbar
let navbarCollapse = function() {
  if ($("#mainNav").offset().top > 150) {
    $("#mainNav").removeClass("transparent-navbar");
  } else {
    $("#mainNav").addClass("transparent-navbar");
  }
};

// Collapse now if page is not at top
navbarCollapse();

// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);