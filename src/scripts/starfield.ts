import { LANG_COLORS, PROJECTS, SKY_PINS, repoUrl, type Project } from "../data/projects";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface SkyStar extends Project {
  url: string;
  x: number;
  y: number;
  r: number;
  color: string;
  phase: number;
}

interface BgStar {
  x: number;
  y: number;
  r: number;
  a: number;
  phase: number;
  speed: number;
  depth: number;
  warm: boolean;
}

function starRadius(stars: number): number {
  return 1.9 + Math.log10(stars + 1) * 1.55;
}

function hexA(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

export function initStarfield(): void {
  const canvas = document.getElementById("sky") as HTMLCanvasElement | null;
  if (!canvas) return;
  const hero = canvas.closest(".hero") as HTMLElement | null;
  if (!hero) return;
  const tip = document.getElementById("starTip");
  const tipName = document.getElementById("starTipName");
  const tipMeta = document.getElementById("starTipMeta");
  const ctx = canvas.getContext("2d");
  if (!ctx || !tip || !tipName || !tipMeta) return;

  let W = 0, H = 0, DPR = 1;
  let bgStars: BgStar[] = [];
  let skyStars: SkyStar[] = [];
  let chain: SkyStar[] = [];
  let shooting: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
  let nextShoot = 4000;
  let running = true;
  let hovered: SkyStar | null = null;

  const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
  const px = { x: 0.5, y: 0.4 };

  function build() {
    const rect = hero!.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas!.width = W * DPR;
    canvas!.height = H * DPR;
    ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);

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

    skyStars = SKY_PINS.map((pin) => {
      const p = PROJECTS.find((pr) => pr.name === pin.name)!;
      return {
        ...p,
        url: repoUrl(p.name),
        x: pin.fx * W,
        y: pin.fy * H,
        r: starRadius(p.stars),
        color: LANG_COLORS[p.lang] || "#98A1C6",
        phase: Math.random() * Math.PI * 2,
      };
    });

    const rest = skyStars.slice();
    chain = [rest.shift()!];
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

  function parallax(depth: number): [number, number] {
    const ox = (px.x - 0.5) * depth * 26;
    const oy = (px.y - 0.5) * depth * 18;
    return [ox, oy];
  }

  function draw(t: number) {
    ctx!.clearRect(0, 0, W, H);
    px.x += (pointer.tx - px.x) * 0.055;
    px.y += (pointer.ty - px.y) * 0.055;

    /* dust */
    for (const s of bgStars) {
      const tw = REDUCED ? 1 : 0.62 + 0.38 * Math.sin(t * 0.001 * s.speed + s.phase);
      const [ox, oy] = REDUCED ? [0, 0] : parallax(s.depth);
      ctx!.globalAlpha = s.a * tw;
      ctx!.fillStyle = s.warm ? "#ffd9a8" : "#f4f4f2";
      ctx!.beginPath();
      ctx!.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
      ctx!.fill();
    }

    /* constellation lines */
    ctx!.globalAlpha = 1;
    ctx!.lineWidth = 1;
    for (let i = 0; i < chain.length - 1; i++) {
      const a = chain[i], b = chain[i + 1];
      const [aox, aoy] = REDUCED ? [0, 0] : parallax(0.6);
      ctx!.strokeStyle = "rgba(244, 244, 242, 0.10)";
      ctx!.beginPath();
      ctx!.moveTo(a.x + aox, a.y + aoy);
      ctx!.lineTo(b.x + aox, b.y + aoy);
      ctx!.stroke();
    }

    /* project stars */
    for (const s of skyStars) {
      const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
      const x = s.x + ox, y = s.y + oy;
      const isHover = hovered === s;
      const pulse = REDUCED ? 1 : 0.85 + 0.15 * Math.sin(t * 0.0012 + s.phase);
      const r = s.r * pulse * (isHover ? 1.35 : 1);

      const glow = ctx!.createRadialGradient(x, y, 0, x, y, r * 7);
      glow.addColorStop(0, hexA(s.color, isHover ? 0.5 : 0.34));
      glow.addColorStop(1, hexA(s.color, 0));
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(x, y, r * 7, 0, Math.PI * 2);
      ctx!.fill();

      if (s.stars >= 100) {
        ctx!.strokeStyle = hexA("#f4f4f2", isHover ? 0.55 : 0.3);
        ctx!.lineWidth = 1;
        const L = r * 3.4;
        ctx!.beginPath();
        ctx!.moveTo(x - L, y); ctx!.lineTo(x + L, y);
        ctx!.moveTo(x, y - L); ctx!.lineTo(x, y + L);
        ctx!.stroke();
      }

      ctx!.globalAlpha = 1;
      ctx!.fillStyle = "#ffffff";
      ctx!.beginPath();
      ctx!.arc(x, y, r * 0.42, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;

    /* shooting star */
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
        const grad = ctx!.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * Math.max(s.life, 0)})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx!.stroke();
        if (s.life <= 0 || s.x < -80 || s.x > W + 80 || s.y > H + 80) {
          shooting = null;
          nextShoot = t + 7000 + Math.random() * 8000;
        }
      }
    }
  }

  function pick(cx: number, cy: number, radius = 20): SkyStar | null {
    let best: SkyStar | null = null, bd = radius * radius;
    for (const s of skyStars) {
      const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
      const d = (s.x + ox - cx) ** 2 + (s.y + oy - cy) ** 2;
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  function showTip(s: SkyStar) {
    const [ox, oy] = REDUCED ? [0, 0] : parallax(0.6);
    tipName!.textContent = s.name;
    tipMeta!.textContent = `${s.lang} · ★ ${s.stars}`;
    tip!.style.left = `${s.x + ox}px`;
    tip!.style.top = `${s.y + oy}px`;
    tip!.classList.add("is-visible");
  }
  function hideTip() { tip!.classList.remove("is-visible"); }

  function toCanvas(e: PointerEvent): [number, number] {
    const r = canvas!.getBoundingClientRect();
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

  canvas.addEventListener(
    "touchstart",
    (e) => {
      const tch = e.touches[0];
      const r = canvas.getBoundingClientRect();
      // fingers are less precise than a cursor — widen the hit area
      const hit = pick(tch.clientX - r.left, tch.clientY - r.top, 36);
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
    },
    { passive: true },
  );

  let rafId: number | null = null;
  function loop(t: number) {
    if (!running) { rafId = null; return; }
    draw(t);
    rafId = requestAnimationFrame(loop);
  }
  function start() { if (rafId === null) rafId = requestAnimationFrame(loop); }

  new IntersectionObserver(
    ([entry]) => { running = entry.isIntersecting; if (running) start(); },
    { threshold: 0 },
  ).observe(hero);

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) start();
  });

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); if (REDUCED) draw(0); }, 120);
  });

  build();
  if (REDUCED) draw(0); else start();
}
