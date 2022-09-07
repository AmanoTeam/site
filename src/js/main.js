import "./faIcons.js";
import { animatedModal } from "./animatedModal.js";
import 'bootstrap/js/dist/collapse.js';

import { tsParticles } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadCircleShape } from "tsparticles-shape-circle";

// Set up modals
let defopts = {
  animatedIn: "zoomIn",
  animatedOut: "fadeOut"
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

let navClasses = document.getElementById("mainNav").classList;
let navToggle = document.querySelector("button.navbar-toggler").classList;


document.getElementById("menu-toggle").addEventListener("click", () => {
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

loadBaseMover(tsParticles);
loadColorUpdater(tsParticles);
loadOpacityUpdater(tsParticles);
loadCircleShape(tsParticles);


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

copyYear.innerText = new Date().getFullYear().toString();
