import "../index.html";

import "animate.css";
import 'bootstrap/dist/css/bootstrap.css';
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../css/main.css";

import "./faIcons";
import { animatedModal } from "./animatedModal";
import { loadFull } from "tsparticles";
import 'bootstrap/js/dist/collapse';

// Set up modals
let defopts = {
  animatedOut: "animate__fadeOut"
};

animatedModal(document.getElementById("amanobot-a"), { ...defopts, color: "#0C1020" });
animatedModal(document.getElementById("brdotml-a"), { ...defopts, color: "#111" });
animatedModal(document.getElementById("customgram-a"), { ...defopts, color: "#3C7DC2" });
animatedModal(document.getElementById("duckpy-a"), { ...defopts, color: "#DA4A26" });
animatedModal(document.getElementById("eduurobot-a"), { ...defopts, color: "#C90000" });
animatedModal(document.getElementById("infoplaca-a"), { ...defopts, color: "#316dcd" });
animatedModal(document.getElementById("lyricspy-a"), { ...defopts, color: "#000" });
animatedModal(document.getElementById("pykorone-a"), { ...defopts, color: "#866539" });
animatedModal(document.getElementById("userlixo-a"), { ...defopts, color: "#8C5AD3" });

window.addEventListener("load", () => {
  let removeTarget = document.getElementById("loading");
  if (removeTarget) {
    removeTarget.style.opacity = "0";
    setTimeout(() => { removeTarget.remove(); }, 500);
  }
});

let navClasses = document.getElementById("mainNav").classList;
let navToggle = document.querySelector("button.navbar-toggler").classList;


document.getElementById("menu-icon").addEventListener("click", () => {
  if (navToggle.contains("collapsed")) {
    navClasses.remove("mobile-navbar");
  } else {
    navClasses.add("mobile-navbar");
  }
});

// Collapse Navbar
let navbarCollapse = () => {
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

/*loadFull("main-header-bg", {
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
});*/


let copyYear = document.getElementById("copy-year");

copyYear.innerText = new Date().getFullYear().toString();
