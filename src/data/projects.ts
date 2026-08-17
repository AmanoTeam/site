/**
 * AMANO TEAM — data layer
 * The constellation, indexed (GitHub, Aug 2026).
 * Kept in a single typed module so both server templates
 * (Catalog rows) and client scripts (starfield) import one source of truth.
 */

export type ProjectCategory = "bots" | "libs" | "tools" | "apps";

export interface Project {
  name: string;
  cat: ProjectCategory;
  lang: string;
  stars: number;
  desc: string;
}

export const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  Kotlin: "#A97BFF",
  Java: "#B07219",
  Rust: "#DEA584",
  C: "#9B9B9B",
  Shell: "#89E051",
  Nim: "#FFC200",
  Directory: "#98A1C6",
};

export const PROJECTS: readonly Project[] = [
  // bots
  { name: "EduuRobot", cat: "bots", lang: "Python", stars: 138, desc: "The multipurpose Telegram bot that started it all — group admin turned public utility." },
  { name: "UserLixo", cat: "bots", lang: "Python", stars: 79, desc: "A userbot for Telegram with many, many functions." },
  { name: "LyricsPyRobot", cat: "bots", lang: "Python", stars: 35, desc: "A Telegram bot for searching lyrics." },
  { name: "AmimeWatch", cat: "bots", lang: "Python", stars: 25, desc: "Anime tracking on Telegram, powered by AniList." },
  { name: "UnuRobot", cat: "bots", lang: "Python", stars: 9, desc: "Play Mau Mau (UNO) on Telegram through inline queries." },
  { name: "InfoPlaca", cat: "bots", lang: "Python", stars: 6, desc: "Consult Brazilian vehicle license plates from Telegram." },
  // libraries
  { name: "duckpy", cat: "libs", lang: "Python", stars: 40, desc: "A simple Python library for searching on DuckDuckGo." },
  { name: "Unalix", cat: "libs", lang: "Python", stars: 38, desc: "Small, dependency-free package that removes tracking fields from URLs." },
  { name: "amanobot", cat: "libs", lang: "Python", stars: 20, desc: "Python framework for the Telegram Bot API, forked from Telepot." },
  { name: "python-anilist", cat: "libs", lang: "Python", stars: 16, desc: "A simple Python 3 library for AniList." },
  { name: "LyricsPy", cat: "libs", lang: "Python", stars: 11, desc: "Lyrics search across Musixmatch, Genius and letras.mus.br." },
  { name: "Unalix-nim", cat: "libs", lang: "Nim", stars: 11, desc: "The Nim port of Unalix — library and CLI tool." },
  { name: "rust-anilist", cat: "libs", lang: "Rust", stars: 8, desc: "A robust Rust wrapper for the AniList API." },
  { name: "ferogram", cat: "libs", lang: "Rust", stars: 6, desc: "A high-level Rust framework built on top of grammers." },
  { name: "Latinize", cat: "libs", lang: "Nim", stars: 5, desc: "Convert accented characters to plain Latin — library and CLI." },
  // toolchains
  { name: "obggcc", cat: "tools", lang: "Shell", stars: 64, desc: "Linux C/C++ cross-compiler targeting older glibc versions." },
  { name: "Kad", cat: "tools", lang: "C", stars: 14, desc: "A simple HTTP proxy forwarding all requests through curl-impersonate." },
  { name: "Kai", cat: "tools", lang: "C", stars: 8, desc: "A command-line utility to download contents from M3U8 playlists." },
  { name: "android-gcc-cross", cat: "tools", lang: "Shell", stars: 7, desc: "A GCC cross-compiler targeting Android." },
  { name: "musl-gcc-cross", cat: "tools", lang: "Shell", stars: 6, desc: "A GCC cross-compiler targeting Linux musl." },
  { name: "nz", cat: "tools", lang: "C", stars: 1, desc: "Download and install packages from APT, APK and Pacman repositories." },
  // apps
  { name: "Kahon", cat: "apps", lang: "Kotlin", stars: 285, desc: "A fork of Mihon with some annoying restrictions removed." },
  { name: "JustDeleteMe", cat: "apps", lang: "Directory", stars: 100, desc: "A directory of direct links to delete your account from web services." },
  { name: "Goregram", cat: "apps", lang: "Java", stars: 40, desc: "A Telegram fork with minimal extra features." },
  { name: "Sunny", cat: "apps", lang: "Java", stars: 27, desc: "Stops Mihon from throttling your requests by ignoring rate limits." },
  { name: "UnalixAndroid", cat: "apps", lang: "Java", stars: 27, desc: "Removes link masking and tracking; resolves shortened links." },
  { name: "Papo", cat: "apps", lang: "Rust", stars: 9, desc: "Unofficial GTK client for WhatsApp, built with Rust." },
  { name: "Kanni", cat: "apps", lang: "Java", stars: 7, desc: "Prevents apps from taking control of the screen brightness." },
  { name: "Nel", cat: "apps", lang: "Java", stars: 6, desc: "Brings back Android 10's KeyChain.createInstallIntent() behavior." },
];

/** The nine brightest — pinned to the sky as the hero constellation.
 *  Positions are fractions of the hero, biased to the upper sky so
 *  they never collide with the headline. */
export interface SkyPin {
  name: string;
  fx: number;
  fy: number;
}

export const SKY_PINS: SkyPin[] = [
  { name: "Kahon", fx: 0.235, fy: 0.24 },
  { name: "EduuRobot", fx: 0.42, fy: 0.135 },
  { name: "JustDeleteMe", fx: 0.605, fy: 0.265 },
  { name: "UserLixo", fx: 0.79, fy: 0.15 },
  { name: "obggcc", fx: 0.88, fy: 0.36 },
  { name: "duckpy", fx: 0.66, fy: 0.47 },
  { name: "Goregram", fx: 0.85, fy: 0.59 },
  { name: "Unalix", fx: 0.5, fy: 0.4 },
  { name: "LyricsPyRobot", fx: 0.33, fy: 0.45 },
];

export const GITHUB_ORG = "https://github.com/AmanoTeam";

export function repoUrl(name: string): string {
  return `${GITHUB_ORG}/${name}`;
}

export const FILTERS: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "all", value: "all" },
  { label: "bots", value: "bots" },
  { label: "libraries", value: "libs" },
  { label: "toolchains", value: "tools" },
  { label: "apps", value: "apps" },
];
