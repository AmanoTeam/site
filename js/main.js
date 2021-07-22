// Set up modals
let defopts = {
  animatedIn: "zoomIn",
  animatedOut: "fadeOut"
};

$("#amanobot-a").animatedModal(Object.assign({}, defopts, {
  color: "#0C1020",
  modalTarget: "amanobot-modal"
}));
$("#brdotml-a").animatedModal(Object.assign({}, defopts, {
  color: "#111",
  modalTarget: "brdotml-modal"
}));
$("#customgram-a").animatedModal(Object.assign({}, defopts, {
  color: "#3C7DC2",
  modalTarget: "customgram-modal"
}));
$("#duckpy-a").animatedModal(Object.assign({}, defopts, {
  color: "#DA4A26",
  modalTarget: "duckpy-modal"
}));
$("#eduurobot-a").animatedModal(Object.assign({}, defopts, {
  color: "#C90000",
  modalTarget: "eduurobot-modal"
}));
$("#infoplaca-a").animatedModal(Object.assign({}, defopts, {
  color: "#316dcd",
  modalTarget: "infoplaca-modal"
}));
$("#lyricspy-a").animatedModal(Object.assign({}, defopts, {
  color: "#000",
  modalTarget: "lyricspy-modal"
}));
$("#pykorone-a").animatedModal(Object.assign({}, defopts, {
  color: "#866539",
  modalTarget: "pykorone-modal"
}));
$("#userlixo-a").animatedModal(Object.assign({}, defopts, {
  color: "#8C5AD3",
  modalTarget: "userlixo-modal"
}));

window.addEventListener("load", function() {
  $("#loading").fadeOut(500, function() {
    $(this).remove();
  });
});

// Smooth scrolling using jQuery easing
$("a[class*='smooth-scroll']").click(function() {
  let target = $(this.hash);
  target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
  $("html, body").animate({
    scrollTop: (target.length ? target.offset().top - 55 : 0)
  }, 500, "easeOutExpo");
  return false;
});

let navClasses = document.getElementById("mainNav").classList;
let navToggle = document.querySelector("button.navbar-toggler").classList;


document.getElementById("menu-icon").addEventListener("click", function() {
  if (navToggle.contains("collapsed")) {
    navClasses.remove("mobile-navbar");
  } else {
    navClasses.add("mobile-navbar");
  }
});

// Collapse Navbar
let navbarCollapse = function() {
  if ($("#mainNav").offset().top > 1) {
    navClasses.remove("transparent-navbar");
  } else {
    navClasses.add("transparent-navbar");
  }
};

// Collapse now if page is not at top
navbarCollapse();

// Collapse the navbar when page is scrolled
window.addEventListener("scroll", navbarCollapse);

particlesJS.load("main-header-bg", "assets/particles.json", function() {
  console.log("callback - particles.js config loaded");
});
