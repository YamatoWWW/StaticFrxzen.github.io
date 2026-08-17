'use strict';

/* ============================================================================
   ██╗   ██╗  CONFIG — THE ONLY FILE YOU NEED TO EDIT
   ██║   ██║
   ██║ █ ██║  Every string, link, widget, and style value is wired to this
   ╚██████╔╝  block. The core HTML/CSS never needs touching.
   ============================================================================
*/
const CONFIG = {

  /* ---------- BRAND / PROFILE ---------- */
  brand: {
    username: 'FRXZEN',
    handle: '@frxzen',
    title: 'F R X Z E N',              // typed on the splash screen
    sub: 'FRAGMENT // DIGITAL ENTITY', // static splash subtitle
    enterLabel: 'CLICK TO ENTER',
    splashNote: 'AUDIO ENABLED — HEADPHONES RECOMMENDED',  // set '' to hide
    avatar: 'https://i.pravatar.cc/300?img=5',              // 1:1 square image
    statusPrefix: 'STATUS:',
    statuses: [                         // cycled by the typewriter banner
      'processing reality…',
      'writing the future in neon',
      'probably gaming, not sleeping',
      'hacking the mainframe (legally)',
      'code > coffee > everything',
    ],
    footer: '© 2026 FRXZEN — ALL SYSTEMS NOMINAL',
  },

  /* ---------- DISCORD / RICH PRESENCE ---------- */
  discord: {
    userId: '',                        // Discord snowflake -> REAL live presence via Lanyard API
    username: 'frxzen',                // used when userId is empty or the API fails
    tag: '#0001',
    avatar: 'https://i.pravatar.cc/128?img=11',
    status: 'online',                  // online | idle | dnd | offline  (mock fallback)
    statusText: 'ONLINE',
    richPresence: {                    // mockup shown until/unless Lanyard data arrives
      enabled: true,
      activity: 'PLAYING A GAME',
      game: 'Cyberpunk 2077: Phantom Liberty',
      details: 'Night City — act 3 • solo, no regrets',
      art: 'https://picsum.photos/seed/cp2077/176/176',
      startedAgoMinutes: 42,           // pretend the session started X minutes ago
    },
  },

  /* ---------- MUSIC PLAYER ---------- */
  music: {
    autoplay: true,                    // only kicks in after the splash click gesture
    volume: 0.7,                       // 0..1
    source: 'STREAM SOURCE',
    tracks: [
      { title: 'Neon Run',     artist: 'FRXZEN x ZERO', art: 'https://picsum.photos/seed/neonrun/256/256',     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { title: 'Phantom',      artist: 'KEROSENE',      art: 'https://picsum.photos/seed/phantom/256/256',      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { title: 'Static Void',  artist: 'NOVA',          art: 'https://picsum.photos/seed/staticvoid/256/256',  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    ],
  },

  /* ---------- BACKGROUND ---------- */
  background: {
    mode: 'particles',                 // 'particles' | 'video'
    video: '',                         // full URL of looping .mp4 (used when mode = 'video')
    particleTheme: 'nodes',            // 'nodes' | 'matrix' | 'sparks'  (can cycle via the ✦ button)
    particleCount: 0,                  // 0 = auto (based on screen area)
    colors: ['#00e5ff', '#b026ff', '#ff2d95'],
    mouseInfluence: 0.14,              // how strongly the mouse pulls nodes / pushes sparks
  },

  /* ---------- SOCIAL LINKS (order = display order) ---------- */
  socials: [
    { id: 'discord',   label: 'DISCORD',   url: 'https://discord.com/users/000000000000000000', color: '#5865F2' },
    { id: 'github',    label: 'GITHUB',    url: 'https://github.com/frxzen',                    color: '#9aa7ff' },
    { id: 'telegram',  label: 'TELEGRAM',  url: 'https://t.me/frxzen',                          color: '#2AABEE' },
    { id: 'tiktok',    label: 'TIKTOK',    url: 'https://tiktok.com/@frxzen',                   color: '#69C9D0' },
    { id: 'instagram', label: 'INSTAGRAM', url: 'https://instagram.com/frxzen',                 color: '#E1306C' },
    { id: 'steam',     label: 'STEAM',     url: 'https://steamcommunity.com/id/frxzen',         color: '#66c0f4' },
    /* extra icon ids available: x, twitch, youtube, spotify */
  ],

  /* ---------- CRYPTO WALLET VAULT ---------- */
  crypto: {
    btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    sol: 'FRXZENw4V8d3p7u9r5WmBqT2LxJk7Yz8Nq3Pt6Hs5V9',
    xmr: '48Rw3Np1f2Xq9Lm7Kb5Yt6Zu4Dc8Ve2Bg3Ha7Jd9Qe5Tr7Bk2Yf4Lg6Mx8Wn9Pz4Qs6Cv1Xb3Tr5Rg7Hy4Jk6Lf8Dz1',
  },

  /* ---------- STATS / SOCIAL PROOF ---------- */
  stats: {
    views: { storageKey: 'cyber_bio_views' },      // +1 once per calendar day, per browser
    hearts: { storageKey: 'cyber_bio_hearts' },    // one heart per visitor (toggleable)
  },
};

/* ============================================================================
   HELPERS
   ============================================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${String(ss).padStart(2, '0')}`;
};

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const hexA = (hex, a) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

const svg = (d, fill = 'currentColor') =>
  `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true"><path d="${d}"/></svg>`;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ============================================================================
   ICON PATHS (24×24)
   ============================================================================ */
const ICONS = {
  discord: 'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  steam: 'M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z',
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  twitch: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  spotify: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
  link: 'M14 3h7v7h-2V6.41L8.41 17H12v2H3v-9h2v3.59L15.59 3H14z',
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zm8 0h4v14h-4z',
  prev: 'M6 6h2v12H6zm3.5 6l8.5 6V6z',
  next: 'M16 6h2v12h-2zM6 18l8.5-6L6 6v12z',
  volume: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
  muted: 'M3 9v6h4l5 5V4L7 9H3zm14.96 3.12l1.42-1.41 1.41 1.41 1.42-1.41 1.42 1.41-1.42 1.41 1.42 1.42-1.42 1.41-1.41-1.42-1.41 1.42-1.42 1.41L20.79 14.1l-1.41-1.42 1.41-1.41z',
  copy: 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
};

/* ============================================================================
   DOM REFS
   ============================================================================ */
const ui = {
  body: document.body,
  splash: $('#splash'), splashBtn: $('#splash-btn'), splashTyped: $('#splash-typed'),
  splashSub: $('#splash-sub'), splashNote: $('#splash-note'), splashLetter: $('#splash-letter'),
  bg: $('#bg'), bgVideo: $('#bg-video'), bgCanvas: $('#bg-canvas'), bgToggle: $('#bg-toggle'),
  cursorDot: $('#cursor-dot'), cursorRing: $('#cursor-ring'), cursorTrail: $('#cursor-trail'),
  avatar: $('#avatar'), profileStatus: $('#profile-status'),
  username: $('#username'), handle: $('#handle'),
  twPrefix: $('#typewriter-prefix'), twText: $('#typewriter-text'),
  discordAvatar: $('#discord-avatar'), discordStatusDot: $('#discord-status-dot'),
  discordUsername: $('#discord-username'), discordTag: $('#discord-tag'),
  discordStatusText: $('#discord-status-text'), discordBadge: $('#discord-badge'),
  rp: $('#rich-presence'), rpCover: $('#rp-cover'), rpOverline: $('#rp-overline'),
  rpTitle: $('#rp-title'), rpDetails: $('#rp-details'), rpTime: $('#rp-time'),
  musicWidget: $('.music'), musicTitle: $('#music-title'), musicArtist: $('#music-artist'),
  musicSource: $('#music-source'), musicArt: $('#music-art-img'), eqBadge: $('#eq-badge'),
  visualizer: $('#visualizer'), timeCurrent: $('#time-current'), timeTotal: $('#time-total'),
  progress: $('#progress'), progressFill: $('#progress-fill'),
  btnPlay: $('#btn-play'), btnPrev: $('#btn-prev'), btnNext: $('#btn-next'), btnMute: $('#btn-mute'),
  walletTabs: $('#wallet-tabs'), qrCanvas: $('#qr-canvas'), walletNetwork: $('#wallet-network'),
  walletAddress: $('#wallet-address'), btnCopy: $('#btn-copy'), copyLabel: $('#copy-label'),
  copyIcon: $('#copy-icon'),
  socialsGrid: $('#socials-grid'),
  viewCount: $('#view-count'), heartBtn: $('#heart-btn'), heartCount: $('#heart-count'),
  heartBurst: $('#heart-burst'),
  footLine: $('#foot-line'),
  toast: $('#toast'),
  audio: $('#audio'),
};

/* ============================================================================
   TOAST
   ============================================================================ */
let toastTimer = null;
function showToast(msg) {
  ui.toast.textContent = msg;
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), 1900);
}

/* ============================================================================
   HEADER / BRAND
   ============================================================================ */
function initHeader() {
  document.title = `${CONFIG.brand.username} — link in bio`;
  ui.username.textContent = CONFIG.brand.username;
  ui.handle.textContent = CONFIG.brand.handle;
  ui.avatar.src = CONFIG.brand.avatar;
  ui.footLine.textContent = CONFIG.brand.footer;
}

/* ============================================================================
   SPLASH SCREEN — typing + click-to-enter + blur-out
   ============================================================================ */
let entered = false;

function typeSplashText(text, el, speed, done) {
  let i = 0;
  (function tick() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, speed);
    else done && done();
  })();
}

function enterSite() {
  if (entered) return;
  entered = true;

  initAudioPlayer();                       // user gesture -> WebAudio + stream allowed
  ui.splash.classList.add('exit');
  ui.body.classList.add('entered');
  ui.body.classList.remove('locked');

  $$('[data-reveal]').forEach((el, i) => {
    el.style.setProperty('--d', `${140 + i * 110}ms`);
    el.classList.add('in');
  });

  startTypewriter();

  if (CONFIG.music.autoplay && CONFIG.music.tracks.length) {
    ui.audio.play().catch(() => {});
  }

  setTimeout(() => ui.splash.remove(), 950);
}

function initSplash() {
  ui.splashLetter.textContent = CONFIG.brand.username.charAt(0).toUpperCase();
  ui.splashSub.textContent = CONFIG.brand.sub;
  ui.splashBtn.textContent = CONFIG.brand.enterLabel;
  ui.splashNote.textContent = CONFIG.brand.splashNote;
  typeSplashText(CONFIG.brand.title, ui.splashTyped, 90);

  ui.splash.addEventListener('click', enterSite);
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !entered) enterSite();
  });
}

/* ============================================================================
   CUSTOM CURSOR — dot + spring ring + trailing chain, scales on hover
   ============================================================================ */
function initCursor() {
  if (!finePointer) return;

  const trailCount = 8;
  const dots = [];
  for (let i = 0; i < trailCount; i++) {
    const d = document.createElement('span');
    d.style.background = i === trailCount - 1 ? hexA(CONFIG.background.colors[2], 0.9)
                                              : hexA(CONFIG.background.colors[0], 0.85);
    d.style.opacity = 1 - i / trailCount;
    ui.cursorTrail.appendChild(d);
    dots.push(d);
  }

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  const tx = new Array(trailCount).fill(mx);
  const ty = new Array(trailCount).fill(my);

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
  });

  document.addEventListener('mouseleave', () => ui.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => ui.body.classList.remove('cursor-hidden'));

  document.addEventListener('mouseover', (e) => {
    const hit = e.target.closest('a, button, .wallet-tab, [data-tooltip]');
    ui.cursorDot.classList.toggle('hover', !!hit);
    ui.cursorRing.classList.toggle('hover', !!hit);
  });

  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    let px = mx, py = my;
    for (let i = 0; i < dots.length; i++) {
      const nx = tx[i] + (px - tx[i]) * 0.34;
      const ny = ty[i] + (py - ty[i]) * 0.34;
      dots[i].style.transform = `translate(${nx}px, ${ny}px)`;
      tx[i] = nx; ty[i] = ny;
      px = nx; py = ny;
    }
    ui.cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    ui.cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
}

/* ============================================================================
   BACKGROUND — looping video OR particle canvas (nodes / matrix / sparks)
   mouse movement steers the particles
   ============================================================================ */
const Background = (() => {
  const ctx = ui.bgCanvas.getContext('2d');
  const cfg = CONFIG.background;
  const PALETTE = cfg.colors;
  const THEMES = ['nodes', 'matrix', 'sparks'];
  const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFXZ';

  let w = 0, h = 0, dpr = 1, raf = 0, running = false;
  let mode = localStorage.getItem('cyber_bio_bg_mode') || cfg.mode;
  let theme = localStorage.getItem('cyber_bio_bg_theme') || cfg.particleTheme;
  let P = [], cols = [];
  const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0, active: false };

  const pickColor = () => PALETTE[(Math.random() * PALETTE.length) | 0];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    ui.bgCanvas.width = w * dpr;
    ui.bgCanvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  }

  function buildParticles() {
    P = [];
    if (theme === 'matrix') {
      cols = [];
      const n = Math.ceil(w / 18);
      for (let i = 0; i < n; i++) {
        cols.push({
          x: i * 18, y: rand(-h, 0), speed: rand(1, 3.6),
          alpha: rand(0.35, 0.9),
        });
      }
    } else if (theme === 'nodes') {
      const target = cfg.particleCount || clamp(Math.floor((w * h) / 16000), 26, 130);
      for (let i = 0; i < target; i++) {
        P.push({
          x: rand(0, w), y: rand(0, h),
          vx: rand(-0.5, 0.5), vy: rand(-0.5, 0.5),
          r: rand(1.2, 3),
          c: hexA(pickColor(), 0.85),
        });
      }
    } else {
      const target = cfg.particleCount || clamp(Math.floor((w * h) / 14000), 30, 150);
      for (let i = 0; i < target; i++) P.push(spark(true));
    }
  }

  function spark(initial) {
    return {
      x: rand(0, w),
      y: initial ? rand(0, h) : rand(h * 0.4, h + 10),
      vx: rand(-0.3, 0.3), vy: rand(-1.5, -0.4),
      age: 0, life: rand(60, 140),
      r: rand(0.8, 2.6),
      sway: rand(0.5, 1.4), phase: rand(0, 6.283),
      c: pickColor(),
    };
  }

  /* ---------- theme renderers ---------- */
  function drawNodes() {
    ctx.clearRect(0, 0, w, h);
    const infl = cfg.mouseInfluence;

    for (const p of P) {
      let ax = 0, ay = 0;
      if (mouse.active) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 260 && d > 1) { ax = (dx / d) * 0.1 * infl; ay = (dy / d) * 0.1 * infl; }
      }
      p.vx = (p.vx + ax) * 0.985;
      p.vy = (p.vy + ay) * 0.985;
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < P.length; i++) {
      const a = P[i];
      for (let j = i + 1; j < P.length; j++) {
        const b = P[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < 110) {
          ctx.strokeStyle = `rgba(110,190,255,${(1 - d / 110) * 0.4})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const p of P) {
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
    }

    if (mouse.active) {
      let best = null, bd = 1e9;
      for (const p of P) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < bd) { bd = d; best = p; }
      }
      if (best && bd < 320) {
        ctx.strokeStyle = 'rgba(255,45,149,0.5)';
        ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(best.x, best.y); ctx.stroke();
        ctx.fillStyle = 'rgba(255,45,149,0.6)';
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 3, 0, 6.2832); ctx.fill();
      }
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(4,6,12,0.09)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = 'bold 15px monospace';
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i];
      const dx = c.x - mouse.x, dy = c.y - mouse.y;
      const near = dx * dx + dy * dy < 40000;
      c.y += c.speed + (near ? 1.4 : 0);
      if (c.y > h + 20) c.y = rand(-80, -10);
      const char = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      if (near) ctx.fillStyle = 'rgba(255,255,255,0.95)';
      else if (i % 17 === 0) ctx.fillStyle = hexA(PALETTE[2], c.alpha);
      else ctx.fillStyle = `rgba(0,229,255,${c.alpha})`;
      ctx.fillText(char, c.x, c.y);
    }
    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 95);
      g.addColorStop(0, 'rgba(0,229,255,0.13)');
      g.addColorStop(1, 'rgba(0,229,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - 95, mouse.y - 95, 190, 190);
    }
  }

  function drawSparks() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    const infl = cfg.mouseInfluence;
    for (const p of P) {
      p.age++;
      if (p.age > p.life) { Object.assign(p, spark(false), { age: 0 }); }
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 150 && d > 1) { p.vx += (dx / d) * 0.06 * infl; p.vy += (dy / d) * 0.06 * infl; }
      }
      p.vy -= 0.0045;
      p.vx *= 0.995; p.vy *= 0.998;
      p.x += p.vx + mouse.vx * 0.12 + p.sway * Math.sin(p.age * 0.05 + p.phase) * 0.35;
      p.y += p.vy;
      if (p.y < -30 || p.x < -30 || p.x > w + 30) Object.assign(p, spark(false), { age: 0 });
      const life = 1 - p.age / p.life;
      ctx.fillStyle = hexA(p.c, 0.9 * life);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + (1 - life) * 1.8, 0, 6.2832); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  const renderers = { nodes: drawNodes, matrix: drawMatrix, sparks: drawSparks };

  function frame() {
    if (!running) return;
    renderers[theme]();
    raf = requestAnimationFrame(frame);
  }

  /* ---------- public API ---------- */
  function startParticles() {
    ui.bg.classList.add('particle-mode');
    ui.bg.classList.remove('video-mode');
    ui.bgVideo.pause();
    ui.bgVideo.removeAttribute('src');
    if (prefersReduced) { renderers[theme](); return; }
    running = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  function startVideo() {
    if (!cfg.video) return startParticles();
    ui.bg.classList.add('video-mode');
    ui.bg.classList.remove('particle-mode');
    running = false;
    cancelAnimationFrame(raf);
    ui.bgVideo.src = cfg.video;
    const p = ui.bgVideo.play();
    if (p) p.catch(() => { localStorage.setItem('cyber_bio_bg_mode', 'particles'); startParticles(); });
    ui.bgVideo.onerror = () => { localStorage.setItem('cyber_bio_bg_mode', 'particles'); startParticles(); };
  }

  function render() {
    if (mode === 'video') startVideo();
    else startParticles();
  }

  function cycle() {
    if (mode === 'video') {
      mode = 'particles';
    } else {
      theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
      localStorage.setItem('cyber_bio_bg_theme', theme);
      buildParticles();
    }
    localStorage.setItem('cyber_bio_bg_mode', mode);
    render();
    ui.bgToggle.title = mode === 'video' ? 'background: video (click to cycle)'
                                         : `background: ${theme} particles (click to cycle)`;
  }

  function init() {
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => {
      mouse.vx = e.clientX - mouse.px;
      mouse.vy = e.clientY - mouse.py;
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.px = e.clientX; mouse.py = e.clientY;
      mouse.active = true;
    }, { passive: true });
    document.addEventListener('mouseleave', () => { mouse.active = false; });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (mode !== 'video' && !prefersReduced) { running = true; raf = requestAnimationFrame(frame); }
    });

    resize();
    ui.bgToggle.addEventListener('click', cycle);
    render();
  }

  return { init };
})();

/* ============================================================================
   TYPEWRITER BANNER — cycles bio statuses with a blinking caret
   ============================================================================ */
function startTypewriter() {
  const list = CONFIG.brand.statuses;
  if (!list.length) return;
  let i = 0, deleting = false, text = '';
  ui.twPrefix.textContent = CONFIG.brand.statusPrefix;

  (function tick() {
    const full = list[i];
    if (!deleting) {
      text = full.slice(0, text.length + 1);
      ui.twText.textContent = text;
      if (text === full) { deleting = true; setTimeout(tick, 2100); return; }
      setTimeout(tick, 55);
    } else {
      text = full.slice(0, text.length - 1);
      ui.twText.textContent = text;
      if (!text) { deleting = false; i = (i + 1) % list.length; setTimeout(tick, 320); return; }
      setTimeout(tick, 26);
    }
  })();
}

/* ============================================================================
   DISCORD WIDGET — mock rich presence + optional real Lanyard presence
   ============================================================================ */
const STATUS_TEXT = { online: 'ONLINE', idle: 'IDLE', dnd: 'DO NOT DISTURB', offline: 'OFFLINE' };
let rpStart = Date.now();

function setStatus(status) {
  ui.profileStatus.className = `status-dot ${status}`;
  ui.discordStatusDot.className = `status-dot ${status}`;
  ui.discordStatusText.textContent = STATUS_TEXT[status] || status.toUpperCase();
  ui.discordStatusText.classList.toggle('offline', status === 'offline');
}

function initDiscord() {
  const d = CONFIG.discord;
  ui.discordUsername.textContent = d.username;
  ui.discordTag.textContent = d.tag;
  ui.discordAvatar.src = d.avatar;

  const rp = d.richPresence;
  if (rp && rp.enabled) {
    ui.rpOverline.textContent = rp.activity;
    ui.rpTitle.textContent = rp.game;
    ui.rpDetails.textContent = rp.details;
    ui.rpCover.src = rp.art;
    rpStart = Date.now() - (rp.startedAgoMinutes || 0) * 60000;
  } else {
    ui.rp.style.display = 'none';
  }

  setStatus(d.status);
  if (d.statusText) ui.discordStatusText.textContent = d.statusText;

  setInterval(() => {
    const s = Math.floor((Date.now() - rpStart) / 1000);
    ui.rpTime.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} elapsed`;
  }, 1000);

  if (d.userId) pollPresence();
}

async function pollPresence() {
  const uid = CONFIG.discord.userId;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(`https://api.lanyard.rest/v1/users/${uid}`, { signal: ctrl.signal });
    clearTimeout(to);
    if (!res.ok) return;
    const data = (await res.json()).data;
    if (!data) return;

    const status = ['online', 'idle', 'dnd', 'offline'].includes(data.discord_status)
      ? data.discord_status : 'offline';
    setStatus(status);
    ui.discordBadge.classList.toggle('live', status === 'online');
    ui.discordUsername.textContent = data.discord_user.username;
    ui.discordTag.textContent = `#${data.discord_user.discriminator === '0' ? '0001' : data.discord_user.discriminator}`;
    if (data.discord_user.avatar) {
      ui.discordAvatar.src = `https://cdn.discordapp.com/avatars/${uid}/${data.discord_user.avatar}.png?size=128`;
    }

    const act = (data.activities || []).find((a) => a.type === 0 && a.name);
    if (act) {
      ui.rp.style.display = 'flex';
      ui.rpOverline.textContent = 'PLAYING A GAME';
      ui.rpTitle.textContent = act.name;
      ui.rpDetails.textContent = [act.details, act.state].filter(Boolean).join(' • ') || 'in-game';
      rpStart = act.timestamps && act.timestamps.start ? act.timestamps.start : Date.now();
      const appId = act.application_id;
      const asset = act.assets && act.assets.large_image;
      if (appId && asset) {
        ui.rpCover.src = asset.startsWith('mp:')
          ? `https://media.discordapp.net/${asset.slice(3)}?width=176&height=176`
          : `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png?size=176`;
      }
    }
  } catch (e) { /* keep the configured mock */ }
  setTimeout(pollPresence, 30000);
}

/* ============================================================================
   MUSIC PLAYER — audio, seekable progress, analyser visualizer w/ sim fallback
   ============================================================================ */
const Music = (() => {
  const a = ui.audio;
  const tracks = CONFIG.music.tracks;
  let index = 0;
  let analyser = null, barData = null, useReal = false, simMode = false;
  let vizRaf = 0;
  const BARS = 34;

  function setBadge(text, alert = false) {
    ui.eqBadge.classList.toggle('alert', alert);
    ui.eqBadge.classList.toggle('live', !alert && text === 'PLAYING');
    ui.eqBadge.innerHTML = `<span class="badge-dot"></span>${text}`;
  }

  function setPlayIcon(playing) {
    ui.btnPlay.innerHTML = svg(playing ? ICONS.pause : ICONS.play);
  }

  function setMuteIcon(muted) {
    ui.btnMute.innerHTML = svg(muted ? ICONS.muted : ICONS.volume);
    ui.btnMute.classList.toggle('muted', muted);
  }

  function loadTrack(i, auto = true) {
    index = (i + tracks.length) % tracks.length;
    const t = tracks[index];
    ui.musicTitle.textContent = t.title;
    ui.musicArtist.textContent = t.artist;
    ui.musicSource.textContent = CONFIG.music.source;
    ui.musicArt.src = t.art;
    ui.timeTotal.textContent = '0:00';
    ui.timeCurrent.textContent = '0:00';
    ui.progressFill.style.width = '0%';
    a.src = t.url;
    if (auto) a.play().catch(() => setBadge('OFFLINE', true));
  }

  function updateProgress() {
    const pct = a.duration ? (a.currentTime / a.duration) * 100 : 0;
    ui.progressFill.style.width = `${pct}%`;
    ui.timeCurrent.textContent = fmtTime(a.currentTime);
  }

  function seek(e) {
    if (!a.duration) return;
    const r = ui.progress.getBoundingClientRect();
    const pct = clamp((e.clientX - r.left) / r.width, 0, 1);
    a.currentTime = pct * a.duration;
    updateProgress();
  }

  /* ----- visualizer ----- */
  function buildBars() {
    ui.visualizer.innerHTML = '';
    for (let i = 0; i < BARS; i++) {
      const b = document.createElement('i');
      ui.visualizer.appendChild(b);
    }
  }

  function stopVisualizer() {
    cancelAnimationFrame(vizRaf);
    ui.visualizer.classList.add('idle');
  }

  function startVisualizer() {
    if (!tracks.length) return;
    ui.visualizer.classList.remove('idle');
    const bars = $$('i', ui.visualizer);
    const t0 = performance.now();

    const simFrame = (t) => {
      const elapsed = (t - t0) / 1000;
      const beatPhase = ((a.currentTime || 0) * 128 / 60) % 1;    // 128 BPM
      const pulse = Math.max(0, Math.sin(beatPhase * Math.PI));
      for (let i = 0; i < bars.length; i++) {
        const s1 = Math.sin(elapsed * 1.6 + i * 0.9) * 0.5 + 0.5;
        const s2 = Math.sin(elapsed * 2.4 + i * 2.1) * 0.5 + 0.5;
        const h = 8 + s1 * 48 + s2 * 32 + pulse * 42 + (i % 3 === 0 ? 7 : 0);
        bars[i].style.height = `${clamp(h, 6, 100)}%`;
      }
      vizRaf = requestAnimationFrame(simFrame);
    };

    const realFrame = () => {
      analyser.getByteFrequencyData(barData);
      let max = 0;
      for (let i = 0; i < barData.length; i++) if (barData[i] > max) max = barData[i];
      if (max > 4) useReal = true;
      for (let i = 0; i < bars.length; i++) {
        const v = barData[Math.floor((i / bars.length) * barData.length * 0.7)] / 255;
        bars[i].style.height = `${clamp(6 + Math.pow(v, 1.4) * 94, 6, 100)}%`;
      }
      vizRaf = requestAnimationFrame(realFrame);
    };

    const loop = useReal ? realFrame : simFrame;
    vizRaf = requestAnimationFrame(loop);
  }

  function init() {
    buildBars();
    a.volume = CONFIG.music.volume;

    /* best-effort WebAudio analyser — falls back to beat-synced simulation */
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      ac.resume();
      const src = ac.createMediaElementSource(a);
      analyser = ac.createAnalyser();
      analyser.fftSize = 128;
      src.connect(analyser);
      analyser.connect(ac.destination);
      barData = new Uint8Array(analyser.frequencyBinCount);
      const probe = () => {
        analyser.getByteFrequencyData(barData);
        let max = 0;
        for (let i = 0; i < barData.length; i++) if (barData[i] > max) max = barData[i];
        if (max > 4) useReal = true;
        else if (!simMode) { simMode = true; setTimeout(probe, 1500); return; }
        if (useReal) startVisualizer();
        else startVisualizer();
      };
      setTimeout(probe, 700);
    } catch (err) {
      simMode = true;
    }

    a.addEventListener('timeupdate', updateProgress);
    a.addEventListener('loadedmetadata', () => { ui.timeTotal.textContent = fmtTime(a.duration); });
    a.addEventListener('ended', () => loadTrack(index + 1));
    a.addEventListener('play', () => {
      setPlayIcon(true);
      setBadge('PLAYING');
      startVisualizer();
    });
    a.addEventListener('pause', () => {
      setPlayIcon(false);
      setBadge('PAUSED');
      stopVisualizer();
    });
    a.addEventListener('error', () => setBadge('OFFLINE', true));

    ui.btnPlay.addEventListener('click', () => {
      if (a.paused) a.play().catch(() => setBadge('OFFLINE', true));
      else a.pause();
    });
    ui.btnNext.addEventListener('click', () => loadTrack(index + 1));
    ui.btnPrev.addEventListener('click', () => {
      if (a.currentTime > 3) a.currentTime = 0;
      else loadTrack(index - 1);
    });
    ui.btnMute.addEventListener('click', () => {
      a.muted = !a.muted;
      setMuteIcon(a.muted);
    });

    let scrubbing = false;
    ui.progress.addEventListener('pointerdown', (e) => {
      scrubbing = true;
      ui.progress.classList.add('scrubbing');
      ui.progress.setPointerCapture(e.pointerId);
      seek(e);
    });
    ui.progress.addEventListener('pointermove', (e) => scrubbing && seek(e));
    ui.progress.addEventListener('pointerup', () => {
      scrubbing = false;
      ui.progress.classList.remove('scrubbing');
    });

    setPlayIcon(false);
    setMuteIcon(false);
    setBadge('PAUSED');
    loadTrack(0, false);
  }

  return { init, loadTrack };
})();

/* ============================================================================
   WALLET VAULT — tabs, click-to-copy, deterministic fake QR
   ============================================================================ */
const WALLETS = [
  { id: 'btc', name: 'BITCOIN', glyph: '₿', address: CONFIG.crypto.btc },
  { id: 'eth', name: 'ETHEREUM', glyph: 'Ξ', address: CONFIG.crypto.eth },
  { id: 'sol', name: 'SOLANA', glyph: '◎', address: CONFIG.crypto.sol },
  { id: 'xmr', name: 'MONERO', glyph: 'ɱ', address: CONFIG.crypto.xmr },
];
let activeWallet = 0;

function drawQR(text) {
  const c = ui.qrCanvas;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = 132;
  c.width = size * dpr;
  c.height = size * dpr;
  c.style.width = `${size}px`;
  c.style.height = `${size}px`;
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const n = 29, cell = Math.floor(size / (n + 6)), quiet = Math.floor(cell * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#0b0e18';

  let seed = 2166136261;
  const hash = (x) => { seed = Math.imul(seed ^ x, 16777619) >>> 0; return seed; };
  const inFinder = (x, y) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      hash(text.charCodeAt((x * n + y) % text.length) ^ (x * 131 + y * 311));
      if ((seed & 0x3f) < 20) {
        ctx.fillRect(quiet + x * cell, quiet + y * cell, cell, cell);
      }
    }
  }

  const finder = (fx, fy) => {
    ctx.fillStyle = '#0b0e18';
    ctx.fillRect(quiet + fx * cell, quiet + fy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(quiet + (fx + 1) * cell, quiet + (fy + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#0b0e18';
    ctx.fillRect(quiet + (fx + 2) * cell, quiet + (fy + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0);
  finder(n - 7, 0);
  finder(0, n - 7);
}

function setWallet(i) {
  activeWallet = i;
  const w = WALLETS[i];
  $$('.wallet-tab', ui.walletTabs).forEach((t, j) => {
    t.classList.toggle('active', j === i);
    t.setAttribute('aria-selected', j === i);
  });
  ui.walletNetwork.textContent = w.name;
  ui.walletAddress.textContent = w.address;
  drawQR(w.address);
  ui.btnCopy.classList.remove('copied');
  ui.copyLabel.textContent = 'COPY ADDRESS';
  ui.copyIcon.innerHTML = svg(ICONS.copy);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
    ta.remove();
    return ok;
  }
}

function initWallet() {
  ui.walletTabs.innerHTML = WALLETS.map((w, i) => `
    <button class="wallet-tab" role="tab" type="button" aria-selected="${i === 0}"
      style="--i:${i}"><span class="tab-glyph">${w.glyph}</span>${w.name}</button>`).join('');
  $$('.wallet-tab', ui.walletTabs).forEach((t, i) =>
    t.addEventListener('click', () => setWallet(i)));
  setWallet(0);

  ui.btnCopy.addEventListener('click', async () => {
    const ok = await copyText(WALLETS[activeWallet].address);
    if (ok) {
      ui.btnCopy.classList.add('copied');
      ui.copyLabel.textContent = 'COPIED!';
      ui.copyIcon.innerHTML = svg(ICONS.check);
      showToast(`${WALLETS[activeWallet].name} ADDRESS COPIED`);
      setTimeout(() => {
        ui.btnCopy.classList.remove('copied');
        ui.copyLabel.textContent = 'COPY ADDRESS';
        ui.copyIcon.innerHTML = svg(ICONS.copy);
      }, 1800);
    } else {
      showToast('COPY FAILED — SELECT MANUALLY');
    }
  });
}

/* ============================================================================
   SOCIAL LINKS — grid rendered from CONFIG with per-brand accents + tooltips
   ============================================================================ */
function initSocials() {
  ui.socialsGrid.innerHTML = CONFIG.socials.map((s, i) => `
    <a class="social-link" href="${s.url}" target="_blank" rel="noopener noreferrer"
       data-tooltip="${s.label}" style="--i:${i * 70}ms">
      <span class="social-icon">${svg(ICONS[s.id] || ICONS.link)}</span>
      <span class="social-label">${s.label}</span>
      <span class="social-arrow">↗</span>
    </a>`).join('');

  $$('.social-link', ui.socialsGrid).forEach((a, i) => {
    const s = CONFIG.socials[i];
    if (s) {
      a.style.setProperty('--brand', s.color);
      a.style.setProperty('--brand-glow', hexA(s.color, 0.4));
    }
  });
}

/* ============================================================================
   STATS — persistent view counter + toggleable hearts with particle burst
   ============================================================================ */
function animateNumber(el, from, to) {
  const start = performance.now();
  const dur = 900;
  (function step(t) {
    const p = clamp((t - start) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

function burstHearts(n) {
  const colors = ['#ff2d95', '#ff5cae', '#b026ff', '#ff8ac4', '#e1306c'];
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    const ang = rand(-Math.PI, 0);
    const dist = rand(26, 64);
    s.style.setProperty('--x', `${Math.cos(ang) * dist}px`);
    s.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
    s.style.setProperty('--c', colors[(Math.random() * colors.length) | 0]);
    s.style.width = s.style.height = `${rand(5, 9)}px`;
    ui.heartBurst.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
}

function initStats() {
  const vk = CONFIG.stats.views.storageKey;
  const hk = CONFIG.stats.hearts.storageKey;

  let views = parseInt(localStorage.getItem(vk) || '0', 10) || 0;
  const today = new Date().toDateString();
  if (localStorage.getItem(`${vk}_last`) !== today) {
    views += 1;
    localStorage.setItem(vk, String(views));
    localStorage.setItem(`${vk}_last`, today);
  }
  animateNumber(ui.viewCount, Math.max(0, views - 3), views);

  let hearts = parseInt(localStorage.getItem(hk) || '0', 10) || 0;
  let hearted = localStorage.getItem(`${hk}_hearted`) === '1';
  ui.heartCount.textContent = hearts.toLocaleString();
  ui.heartBtn.classList.toggle('hearted', hearted);

  ui.heartBtn.addEventListener('click', () => {
    hearted = !hearted;
    hearts += hearted ? 1 : -1;
    localStorage.setItem(hk, String(Math.max(0, hearts)));
    localStorage.setItem(`${hk}_hearted`, hearted ? '1' : '0');
    ui.heartBtn.classList.toggle('hearted', hearted);
    animateNumber(ui.heartCount, Math.max(0, hearts - (hearted ? 1 : 0)), hearts);
    if (hearted) burstHearts(12);
  });
}

/* ============================================================================
   BOOT
   ============================================================================ */
function init() {
  ui.body.classList.remove('no-js');
  initHeader();
  initDiscord();
  initWallet();
  initSocials();
  initStats();
  Music.init();
  Background.init();
  initCursor();
  initSplash();
}

init();
