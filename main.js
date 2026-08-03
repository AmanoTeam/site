/* ============================================================
   AMANO TEAM
   The field: a night sky where bright stars are repositories.
   ============================================================ */

"use strict";

/* ------------------------------------------------------------
   DATA — the constellation, indexed (GitHub, Aug 2026)
   ------------------------------------------------------------ */
const LANG_COLORS = {
  Python:    "#3572A5",
  Kotlin:    "#A97BFF",
  Java:      "#B07219",
  Rust:      "#DEA584",
  C:         "#9B9B9B",
  Shell:     "#89E051",
  Nim:       "#FFC200",
  Directory: "#98A1C6",
};

const PROJECTS = [
  // bots
  { name: "EduuRobot",    cat: "bots",  lang: "Python", stars: 138, desc: "The multipurpose Telegram bot that started it all — group admin turned public utility." },
  { name: "UserLixo",     cat: "bots",  lang: "Python", stars: 79,  desc: "A userbot for Telegram with many, many functions." },
  { name: "LyricsPyRobot",cat: "bots",  lang: "Python", stars: 35,  desc: "A Telegram bot for searching lyrics." },
  { name: "AmimeWatch",   cat: "bots",  lang: "Python", stars: 25,  desc: "Anime tracking on Telegram, powered by AniList." },
  { name: "UnuRobot",     cat: "bots",  lang: "Python", stars: 9,   desc: "Play Mau Mau (UNO) on Telegram through inline queries." },
  { name: "InfoPlaca",    cat: "bots",  lang: "Python", stars: 6,   desc: "Consult Brazilian vehicle license plates from Telegram." },
  // libraries
  { name: "duckpy",       cat: "libs",  lang: "Python", stars: 40,  desc: "A simple Python library for searching on DuckDuckGo." },
  { name: "Unalix",       cat: "libs",  lang: "Python", stars: 38,  desc: "Small, dependency-free package that removes tracking fields from URLs." },
  { name: "amanobot",     cat: "libs",  lang: "Python", stars: 20,  desc: "Python framework for the Telegram Bot API, forked from Telepot." },
  { name: "python-anilist", cat: "libs", lang: "Python", stars: 16, desc: "A simple Python 3 library for AniList." },
  { name: "LyricsPy",     cat: "libs",  lang: "Python", stars: 11,  desc: "Lyrics search across Musixmatch, Genius and letras.mus.br." },
  { name: "Unalix-nim",   cat: "libs",  lang: "Nim",    stars: 11,  desc: "The Nim port of Unalix — library and CLI tool." },
  { name: "rust-anilist", cat: "libs",  lang: "Rust",   stars: 8,   desc: "A robust Rust wrapper for the AniList API." },
  { name: "ferogram",     cat: "libs",  lang: "Rust",   stars: 6,   desc: "A high-level Rust framework built on top of grammers." },
  { name: "Latinize",     cat: "libs",  lang: "Nim",    stars: 5,   desc: "Convert accented characters to plain Latin — library and CLI." },
  // toolchains
  { name: "obggcc",       cat: "tools", lang: "Shell",  stars: 64,  desc: "Linux C/C++ cross-compiler targeting older glibc versions." },
  { name: "Kad",          cat: "tools", lang: "C",      stars: 14,  desc: "A simple HTTP proxy forwarding all requests through curl-impersonate." },
  { name: "Kai",          cat: "tools", lang: "C",      stars: 8,   desc: "A command-line utility to download contents from M3U8 playlists." },
  { name: "android-gcc-cross", cat: "tools", lang: "Shell", stars: 7, desc: "A GCC cross-compiler targeting Android." },
  { name: "musl-gcc-cross", cat: "tools", lang: "Shell", stars: 6,  desc: "A GCC cross-compiler targeting Linux musl." },
  { name: "nz",           cat: "tools", lang: "C",      stars: 1,   desc: "Download and install packages from APT, APK and Pacman repositories." },
  // apps
  { name: "Kahon",        cat: "apps",  lang: "Kotlin", stars: 285, desc: "A fork of Mihon with some annoying restrictions removed." },
  { name: "JustDeleteMe", cat: "apps",  lang: "Directory", stars: 100, desc: "A directory of direct links to delete your account from web services." },
  { name: "Goregram",     cat: "apps",  lang: "Java",   stars: 40,  desc: "A Telegram fork with minimal extra features." },
  { name: "Sunny",        cat: "apps",  lang: "Java",   stars: 27,  desc: "Stops Mihon from throttling your requests by ignoring rate limits." },
  { name: "UnalixAndroid", cat: "apps", lang: "Java",   stars: 27,  desc: "Removes link masking and tracking; resolves shortened links." },
  { name: "Papo",         cat: "apps",  lang: "Rust",   stars: 9,   desc: "Unofficial GTK client for WhatsApp, built with Rust." },
  { name: "Kanni",        cat: "apps",  lang: "Java",   stars: 7,   desc: "Prevents apps from taking control of the screen brightness." },
  { name: "Nel",          cat: "apps",  lang: "Java",   stars: 6,   desc: "Brings back Android 10's KeyChain.createInstallIntent() behavior." },
];

/* The nine brightest — pinned to the sky as the hero constellation.
   Positions are fractions of the hero, biased to the upper sky so
   they never collide with the headline. */
const SKY_PINS = [
  { name: "Kahon",         fx: 0.235, fy: 0.240 },
  { name: "EduuRobot",     fx: 0.420, fy: 0.135 },
  { name: "JustDeleteMe",  fx: 0.605, fy: 0.265 },
  { name: "UserLixo",      fx: 0.790, fy: 0.150 },
  { name: "obggcc",        fx: 0.880, fy: 0.360 },
  { name: "duckpy",        fx: 0.660, fy: 0.470 },
  { name: "Goregram",      fx: 0.850, fy: 0.590 },
  { name: "Unalix",        fx: 0.500, fy: 0.400 },
  { name: "LyricsPyRobot", fx: 0.330, fy: 0.450 },
];

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   STARFIELD
   ============================================================ */
(function starfield() {
  const canvas = document.getElementById("sky");
  const hero = canvas.closest(".hero");
  const tip = document.getElementById("starTip");
  const tipName = document.getElementById("starTipName");
  const tipMeta = document.getElementById("starTipMeta");
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0, DPR = 1;
  let bgStars = [];
  let skyStars = [];
  let chain = [];
  let shooting = null;
  let nextShoot = 4000;
  let running = true;
  let hovered = null;
  let time = 0;

  const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };   // normalized, lerped
  const px = { x: 0.5, y: 0.4 };                          // rendered value

  function starRadius(stars) {
    return 1.9 + Math.log10(stars + 1) * 1.55;
  }

  function build() {
    const rect = hero.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // background dust
    const count = Math.min(260, Math.round((W * H) / 4200));
    bgStars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.3 + Math.random() * 1.1,
      a: 0.2 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      depth: 0.15 + Math.random() * 0.45,
      warm: Math.random() < 0.16,
    }));

    // pinned project stars
    skyStars = SKY_PINS.map((pin) => {
      const p = PROJECTS.find((pr) => pr.name === pin.name);
      return {
        ...p,
        url: "https://github.com/AmanoTeam/" + p.name,
        x: pin.fx * W,
        y: pin.fy * H,
        r: starRadius(p.stars),
        color: LANG_COLORS[p.lang] || "#98A1C6",
        phase: Math.random() * Math.PI * 2,
      };
    });

    // nearest-neighbour constellation chain
    const rest = skyStars.slice();
    chain = [rest.shift()];
    while (rest.length) {
      const last = chain[chain.length - 1];
      let bi = 0, bd = Infinity;
      rest.forEach((s, i) => {
        const d = (s.x - last.x) ** 2 + (s.y - last.y) ** 2;
        if (d < bd) { bd = d; bi = i; }
      });
      chain.push(rest.splice(bi, 1)[0]);
    }
  }

  function parallax(depth) {
    const ox = (px.x - 0.5) * depth * 26;
    const oy = (px.y - 0.5) * depth * 18;
    return [ox, oy];
  }

  function draw(t) {
    time = t;
    ctx.clearRect(0, 0, W, H);

    // lerp the pointer for buttery parallax
    px.x += (pointer.tx - px.x) * 0.055;
    px.y += (pointer.ty - px.y) * 0.055;

    /* --- dust --- */
    for (const s of bgStars) {
      const tw = REDUCED ? 1 : 0.62 + 0.38 * Math.sin(t * 0.001 * s.speed + s.phase);
      const [ox, oy] = REDUCED ? [0, 0] : parallax(s.depth);
      ctx.globalAlpha = s.a * tw;
      ctx.fillStyle = s.warm ? "#ffd9a8" : "#f4f4f2";
      ctx.beginPath();
      ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    /* --- constellation lines --- */
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    for (let i = 0; i < chain.length - 1; i++) {
      const a = chain[i], b = chain[i + 1];
      const [aox, aoy] = REDUCED ? [0, 0] : parallax(0.6);
      ctx.strokeStyle = "rgba(244, 244, 242, 0.10)";
      ctx.beginPath();
      ctx.moveTo(a.x + aox, a.y + aoy);
      ctx.lineTo(b.x + aox, b.y + aoy);
      ctx.stroke();
    }

    /* --- project stars --- */
    for (const s of skyStars) {
      const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
      const x = s.x + ox, y = s.y + oy;
      const isHover = hovered === s;
      const pulse = REDUCED ? 1 : 0.85 + 0.15 * Math.sin(t * 0.0012 + s.phase);
      const r = s.r * pulse * (isHover ? 1.35 : 1);

      // glow in the project's language color
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
      glow.addColorStop(0, hexA(s.color, isHover ? 0.5 : 0.34));
      glow.addColorStop(1, hexA(s.color, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 7, 0, Math.PI * 2);
      ctx.fill();

      // diffraction spikes on the brightest
      if (s.stars >= 100) {
        ctx.strokeStyle = hexA("#f4f4f2", isHover ? 0.55 : 0.3);
        ctx.lineWidth = 1;
        const L = r * 3.4;
        ctx.beginPath();
        ctx.moveTo(x - L, y); ctx.lineTo(x + L, y);
        ctx.moveTo(x, y - L); ctx.lineTo(x, y + L);
        ctx.stroke();
      }

      // core
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* --- shooting star --- */
    if (!REDUCED) {
      if (!shooting && t > nextShoot) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        shooting = {
          x: W * (0.15 + Math.random() * 0.7),
          y: H * Math.random() * 0.28,
          vx: dir * (5 + Math.random() * 4),
          vy: 2.2 + Math.random() * 1.8,
          life: 1,
        };
      }
      if (shooting) {
        const s = shooting;
        s.x += s.vx; s.y += s.vy; s.life -= 0.018;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * Math.max(s.life, 0)})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
        if (s.life <= 0 || s.x < -80 || s.x > W + 80 || s.y > H + 80) {
          shooting = null;
          nextShoot = t + 7000 + Math.random() * 8000;
        }
      }
    }
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  /* --- picking (hover / click) --- */
  function pick(cx, cy) {
    let best = null, bd = 20 * 20;
    for (const s of skyStars) {
      const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
      const d = (s.x + ox - cx) ** 2 + (s.y + oy - cy) ** 2;
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  function showTip(s) {
    const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
    tipName.textContent = s.name;
    tipMeta.textContent = `${s.lang} · ★ ${s.stars}`;
    tip.style.left = `${s.x + ox}px`;
    tip.style.top = `${s.y + oy}px`;
    tip.classList.add("is-visible");
  }
  function hideTip() { tip.classList.remove("is-visible"); }

  function toCanvas(e) {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  canvas.addEventListener("pointermove", (e) => {
    const [cx, cy] = toCanvas(e);
    pointer.tx = cx / W;
    pointer.ty = cy / H;
    const hit = pick(cx, cy);
    if (hit !== hovered) {
      hovered = hit;
      canvas.style.cursor = hit ? "pointer" : "";
      if (hit) showTip(hit); else hideTip();
    } else if (hit) {
      showTip(hit);
    }
    if (REDUCED) draw(0);
  });

  canvas.addEventListener("pointerleave", () => {
    hovered = null;
    canvas.style.cursor = "";
    hideTip();
    pointer.tx = 0.5; pointer.ty = 0.4;
    if (REDUCED) draw(0);
  });

  canvas.addEventListener("click", (e) => {
    const [cx, cy] = toCanvas(e);
    const hit = pick(cx, cy);
    if (hit) window.open(hit.url, "_blank", "noopener");
  });

  // touch: first tap shows the tip, second tap opens the repo
  canvas.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    const r = canvas.getBoundingClientRect();
    const hit = pick(t.clientX - r.left, t.clientY - r.top);
    if (hit) {
      if (hovered === hit) {
        window.open(hit.url, "_blank", "noopener");
      } else {
        hovered = hit;
        showTip(hit);
      }
    } else {
      hovered = null;
      hideTip();
    }
  }, { passive: true });

  /* --- loop control: only animate while the sky is on screen --- */
  let rafId = null;
  function loop(t) {
    if (!running) { rafId = null; return; }
    draw(t);
    rafId = requestAnimationFrame(loop);
  }
  function start() { if (rafId === null) rafId = requestAnimationFrame(loop); }

  new IntersectionObserver(
    ([entry]) => { running = entry.isIntersecting; if (running) start(); },
    { threshold: 0 }
  ).observe(hero);

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) start();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); if (REDUCED) draw(0); }, 120);
  });

  build();
  if (REDUCED) draw(0); else start();
})();

/* ============================================================
   CATALOG
   ============================================================ */
(function catalog() {
  const rows = document.getElementById("rows");
  const frag = document.createDocumentFragment();

  for (const p of PROJECTS) {
    const li = document.createElement("li");
    li.innerHTML = `
      <a class="row" data-cat="${p.cat}" href="https://github.com/AmanoTeam/${p.name}" target="_blank" rel="noopener" aria-label="${p.name} — ${p.desc} (★ ${p.stars})">
        <span class="row__name">${p.name}</span>
        <span class="row__desc">${p.desc}</span>
        <span class="row__lang mono"><span class="row__dot" style="--dot:${LANG_COLORS[p.lang]}"></span>${p.lang}</span>
        <span class="row__stars mono">★ ${p.stars}</span>
        <span class="row__arrow" aria-hidden="true">↗</span>
      </a>`;
    frag.appendChild(li);
  }
  rows.appendChild(frag);

  /* --- filters --- */
  const chips = document.querySelectorAll(".filters__chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      const f = chip.dataset.filter;
      rows.querySelectorAll(".row").forEach((row) => {
        row.classList.toggle("is-hidden", f !== "all" && row.dataset.cat !== f);
      });
    });
  });
})();

/* ============================================================
   CHROME — nav state + scroll reveals
   ============================================================ */
(function chrome() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (REDUCED) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
