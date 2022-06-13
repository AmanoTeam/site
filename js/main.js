// Set up modals
let defopts = {
  animatedIn: "animate__zoomIn",
  animatedOut: "animate__fadeOut"
};

$("#amanobot-a").animatedModal({
  ...defopts, ...{
    color: "#0C1020",
    modalTarget: "amanobot-modal"
  }
});
$("#brdotml-a").animatedModal({
  ...defopts, ...{
    color: "#111",
    modalTarget: "brdotml-modal"
  }
});
$("#customgram-a").animatedModal({
  ...defopts, ...{
    color: "#3C7DC2",
    modalTarget: "customgram-modal"
  }
});
$("#duckpy-a").animatedModal({
  ...defopts, ...{
    color: "#DA4A26",
    modalTarget: "duckpy-modal"
  }
});
$("#eduurobot-a").animatedModal({
  ...defopts, ...{
    color: "#C90000",
    modalTarget: "eduurobot-modal"
  }
});
$("#infoplaca-a").animatedModal({
  ...defopts, ...{
    color: "#316dcd",
    modalTarget: "infoplaca-modal"
  }
});
$("#lyricspy-a").animatedModal({
  ...defopts, ...{
    color: "#000",
    modalTarget: "lyricspy-modal"
  }
});
$("#pykorone-a").animatedModal({
  ...defopts, ...{
    color: "#866539",
    modalTarget: "pykorone-modal"
  }
});
$("#userlixo-a").animatedModal({
  ...defopts, ...{
    color: "#8C5AD3",
    modalTarget: "userlixo-modal"
  }
});

window.addEventListener("load", function() {
  let removeTarget = document.getElementById("loading");
  removeTarget.style.opacity = "0";
  setTimeout(function(){removeTarget.parentNode.removeChild(removeTarget);}, 500);
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
  if (document.documentElement.scrollTop > 1) {
    navClasses.remove("transparent-navbar");
  } else {
    navClasses.add("transparent-navbar");
  }
};

// Collapse now if page is not at top
navbarCollapse();

// Collapse the navbar when page is scrolled
window.addEventListener("scroll", navbarCollapse);

tsParticles.load("main-header-bg", {
  background: {
    color: {
      value: "#232741"
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    move: {
      enable: true,
      outModes: {
        bottom: "out",
        left: "out",
        right: "out",
        top: "out"
      },
      random: true,
      speed: 1
    },
    number: {
      density: {
        enable: true
      },
      value: 160
    },
    opacity: {
      random: {
        enable: true
      },
      value: {
        min: 0,
        max: 1
      },
      animation: {
        enable: true,
        speed: 1
      }
    },
    size: {
      random: {
        enable: true
      },
      value: {
        min: 1,
        max: 3
      },
      animation: {
        speed: 4,
        minimumValue: 0.3
      }
    }
  }
});


let copyYear = document.getElementById("copy-year");

copyYear.innerText = new Date().getFullYear();
