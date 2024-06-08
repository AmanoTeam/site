import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBook, faChevronDown, faGlobe, faNewspaper, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGitlab, faGooglePlay, faPython, faTelegram } from "@fortawesome/free-brands-svg-icons";

import { animatedModal } from "./animatedModal";
import "bootstrap/js/dist/collapse.js";

import { tsParticles } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadCircleShape } from "tsparticles-shape-circle";

library.add(faBars, faBook, faChevronDown, faGlobe, faNewspaper, faXmark);
library.add(faGithub, faGitlab, faGooglePlay, faPython, faTelegram);

dom.watch();

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

let navClasses = document.getElementById("mainNav")?.classList;
let navToggle = document.querySelector("button.navbar-toggler")?.classList;

let aboutPage = document.getElementById("about");


document.getElementById("menu-toggle")?.addEventListener("click", () => {
  if (navToggle.contains("collapsed")) {
    navClasses.remove("mobile-navbar");
  } else {
    navClasses.add("mobile-navbar");
  }
});

let transparentNavbar = true;

// Collapse the navbar when page is scrolled
window.addEventListener("scroll", (_e) => {
  if (window.scrollY < 1 && !transparentNavbar) {
    transparentNavbar = true;
    navClasses.add("transparent-navbar");
  } else if (window.scrollY >= 1 && transparentNavbar) {
    transparentNavbar = false;
    navClasses.remove("transparent-navbar");
  }
});

// Collapse the navbar when page is loaded
window.dispatchEvent(new Event("scroll"));

loadBaseMover(tsParticles);
loadColorUpdater(tsParticles);
loadOpacityUpdater(tsParticles);
loadOutModesUpdater(tsParticles);
loadSizeUpdater(tsParticles);
loadCircleShape(tsParticles);


let particles = await tsParticles.load("main-header-bg", {
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
      outModes: "out",
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
      random: true,
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
      random: true,
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


let areParticlesPlaying = true;

window.addEventListener("scroll", (_e) => {
  if (window.scrollY > aboutPage.offsetTop && areParticlesPlaying) {
    areParticlesPlaying = false;
    particles.pause();
  } else if (window.scrollY < aboutPage.offsetTop && !areParticlesPlaying) {
    areParticlesPlaying = true;
    particles.play();
  }
});


let copyYear = document.getElementById("copy-year");

copyYear.innerText = new Date().getFullYear().toString();
