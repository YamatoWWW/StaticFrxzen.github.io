'use strict';

/* ============================================================================
   CONFIG — THE ONLY FILE YOU NEED TO EDIT
   ============================================================================
*/
const CONFIG = {

  brand: {
    username: 'FRXZEN',
    handle: '@frxzen',
    title: 'FRXZEN',
    avatar: 'https://i.pravatar.cc/300?img=5',
    statusPrefix: '',
    statuses: [
      'processing reality',
      'writing the future',
      'probably gaming',
      'code > coffee',
      'all systems nominal',
    ],
    footer: '© 2026 frxzen',
  },

  discord: {
    userId: '',
    username: 'frxzen',
    tag: '#0001',
    avatar: 'https://i.pravatar.cc/128?img=11',
    status: 'online',
    richPresence: {
      enabled: true,
      game: 'Cyberpunk 2077',
      details: 'Night City — act 3',
      art: 'https://picsum.photos/seed/cp2077/128/128',
      startedAgoMinutes: 42,
    },
  },

  music: {
    autoplay: false,
    volume: 0.7,
    tracks: [
      { title: 'Neon Run',    artist: 'FRXZEN', art: 'https://picsum.photos/seed/nr/256/256', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { title: 'Phantom',     artist: 'KEROSENE', art: 'https://picsum.photos/seed/ph/256/256', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { title: 'Static Void', artist: 'NOVA', art: 'https://picsum.photos/seed/sv/256/256', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    ],
  },

  crypto: {
    btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    sol: 'FRXZENw4V8d3p7u9r5WmBqT2LxJk7Yz8Nq3Pt6Hs5V9',
    xmr: '48Rw3Np1f2Xq9Lm7Kb5Yt6Zu4Dc8Ve2Bg3Ha7Jd9Qe5Tr7Bk2Yf4Lg6Mx8Wn9Pz4Qs6',
  },

  socials: [
    { id: 'discord',   label: 'Discord',   url: 'https://discord.com/users/000', color: '#5865F2' },
    { id: 'github',    label: 'GitHub',    url: 'https://github.com/frxzen',     color: '#9aa7ff' },
    { id: 'telegram',  label: 'Telegram',  url: 'https://t.me/frxzen',           color: '#2AABEE' },
    { id: 'tiktok',    label: 'TikTok',    url: 'https://tiktok.com/@frxzen',    color: '#69C9D0' },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/frxzen',  color: '#E1306C' },
    { id: 'steam',     label: 'Steam',     url: 'https://steamcommunity.com/id/frxzen', color: '#66c0f4' },
  ],

  stats: {
    views: { storageKey: 'bio_views' },
    hearts: { storageKey: 'bio_hearts' },
  },
};

/* ============================================================================
   HELPERS
   ============================================================================ */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const rand = (a, b) => a + Math.random() * (b - a);

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const hexA = (hex, a) => {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(f, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const svg = (d) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;

/* ============================================================================
   ICON PATHS
   ============================================================================ */
const ICONS = {
  discord: 'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  steam: 'M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z',
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zm8 0h4v14h-4z',
  copy: 'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
};

/* ============================================================================
   DOM REFS
   ============================================================================ */
const ui = {
  body: document.body,
  splash: $('#splash'), splashName: $('#splash-name'),
  main: $('#main'),
  avatar: $('#avatar'), username: $('#username'), handle: $('#handle'),
  bioText: $('#bio-text'),
  discordAvatar: $('#discord-avatar'), discordStatusDot: $('#discord-status-dot'),
  discordName: $('#discord-name'), discordTag: $('#discord-tag'),
  rp: $('#rich-presence'), rpCover: $('#rp-cover'), rpOverline: $('#rp-overline'),
  rpTitle: $('#rp-title'), rpDetails: $('#rp-details'), rpTime: $('#rp-time'),
  musicArt: $('#music-art-img'), musicTitle: $('#music-title'),
  musicArtist: $('#music-artist'), btnPlay: $('#btn-play'),
  progress: $('#progress'), progressFill: $('#progress-fill'),
  timeCurrent: $('#time-current'), timeTotal: $('#time-total'),
  btnPrev: $('#btn-prev'), btnNext: $('#btn-next'),
  walletTabs: $('#wallet-tabs'), qrCanvas: $('#qr-canvas'),
  walletNetwork: $('#wallet-network'), walletAddress: $('#wallet-address'),
  btnCopy: $('#btn-copy'), socialsGrid: $('#socials-grid'),
  viewCount: $('#view-count'), heartBtn: $('#heart-btn'),
  heartCount: $('#heart-count'), footLine: $('#foot-line'),
  toast: $('#toast'), audio: $('#audio'),
};

/* ============================================================================
   TOAST
   ============================================================================ */
let toastTimer = null;
function showToast(msg) {
  ui.toast.textContent = msg;
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), 1800);
}

/* ============================================================================
   SPLASH
   ============================================================================ */
let entered = false;

function enterSite() {
  if (entered) return;
  entered = true;

  try {
    initAudioPlayer();
  } catch (e) {
    /* audio broken — site still enters */
  }

  ui.splash.classList.add('exit');
  ui.body.classList.remove('locked');

  setTimeout(() => {
    ui.main.classList.add('visible');
    ui.splash.remove();
    $$('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${80 + i * 70}ms`);
      el.classList.add('in');
    });
    startTypewriter();
  }, 100);
}

function initSplash() {
  ui.splashName.textContent = CONFIG.brand.title;
  ui.splash.addEventListener('click', enterSite);
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !entered) enterSite();
  });
}

/* ============================================================================
   HEADER
   ============================================================================ */
function initHeader() {
  document.title = `${CONFIG.brand.username} — link in bio`;
  ui.username.textContent = CONFIG.brand.username;
  ui.handle.textContent = CONFIG.brand.handle;
  ui.avatar.src = CONFIG.brand.avatar;
  ui.footLine.textContent = CONFIG.brand.footer;
}

/* ============================================================================
   TYPEWRITER
   ============================================================================ */
function startTypewriter() {
  const list = CONFIG.brand.statuses;
  if (!list.length) return;
  let i = 0, del = false, txt = '';
  (function tick() {
    const full = list[i];
    if (!del) {
      txt = full.slice(0, txt.length + 1);
      ui.bioText.textContent = txt;
      if (txt === full) { del = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 50);
    } else {
      txt = full.slice(0, txt.length - 1);
      ui.bioText.textContent = txt;
      if (!txt) { del = false; i = (i + 1) % list.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 25);
    }
  })();
}

/* ============================================================================
   DISCORD — mock + optional real Lanyard presence
   ============================================================================ */
const STATUS_MAP = { online: 'online', idle: 'idle', dnd: 'dnd', offline: 'offline' };
let rpStart = Date.now();

function setStatus(s) {
  ui.discordStatusDot.className = `status-dot ${STATUS_MAP[s] || 'offline'}`;
}

function initDiscord() {
  const d = CONFIG.discord;
  ui.discordName.textContent = d.username;
  ui.discordTag.textContent = d.tag;
  ui.discordAvatar.src = d.avatar;
  setStatus(d.status);

  const rp = d.richPresence;
  if (rp && rp.enabled) {
    ui.rpOverline.textContent = 'Playing a game';
    ui.rpTitle.textContent = rp.game;
    ui.rpDetails.textContent = rp.details || '';
    ui.rpCover.src = rp.art;
    rpStart = Date.now() - (rp.startedAgoMinutes || 0) * 60000;
    setInterval(() => {
      const s = Math.floor((Date.now() - rpStart) / 1000);
      ui.rpTime.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} elapsed`;
    }, 1000);
  } else {
    ui.rp.style.display = 'none';
  }

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
    const st = ['online', 'idle', 'dnd', 'offline'].includes(data.discord_status) ? data.discord_status : 'offline';
    setStatus(st);
    ui.discordName.textContent = data.discord_user.username;
    if (data.discord_user.avatar) {
      ui.discordAvatar.src = `https://cdn.discordapp.com/avatars/${uid}/${data.discord_user.avatar}.png?size=128`;
    }
    const act = (data.activities || []).find(a => a.type === 0 && a.name);
    if (act) {
      ui.rp.style.display = 'flex';
      ui.rpTitle.textContent = act.name;
      ui.rpDetails.textContent = [act.details, act.state].filter(Boolean).join(' · ') || '';
      rpStart = act.timestamps?.start || Date.now();
      const appId = act.application_id;
      const asset = act.assets?.large_image;
      if (appId && asset) {
        ui.rpCover.src = asset.startsWith('mp:')
          ? `https://media.discordapp.net/${asset.slice(3)}?size=128`
          : `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png?size=128`;
      }
    }
  } catch (e) { /* keep mock */ }
  setTimeout(pollPresence, 30000);
}

/* ============================================================================
   MUSIC PLAYER — safe init, thin progress, simple controls
   ============================================================================ */
function initAudioPlayer() {
  const a = ui.audio;
  const tracks = CONFIG.music.tracks;
  if (!tracks.length) return;
  let idx = 0;

  a.volume = clamp(CONFIG.music.volume, 0, 1);

  function load(i) {
    idx = (i + tracks.length) % tracks.length;
    const t = tracks[idx];
    ui.musicTitle.textContent = t.title;
    ui.musicArtist.textContent = t.artist;
    ui.musicArt.src = t.art;
    ui.timeTotal.textContent = '0:00';
    ui.progressFill.style.width = '0%';
    a.src = t.url;
  }

  function updateProgress() {
    if (!a.duration) return;
    ui.progressFill.style.width = `${(a.currentTime / a.duration) * 100}%`;
    ui.timeCurrent.textContent = fmtTime(a.currentTime);
    ui.timeTotal.textContent = fmtTime(a.duration);
  }

  function seek(e) {
    if (!a.duration) return;
    const r = ui.progress.getBoundingClientRect();
    a.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * a.duration;
    updateProgress();
  }

  /* play / pause */
  function setIcon(playing) {
    ui.btnPlay.innerHTML = svg(playing ? ICONS.pause : ICONS.play);
  }

  ui.btnPlay.addEventListener('click', () => {
    try {
      if (a.paused) a.play().catch(() => {});
      else a.pause();
    } catch (e) { /* ignore */ }
  });

  ui.btnNext.addEventListener('click', () => { load(idx + 1); });
  ui.btnPrev.addEventListener('click', () => {
    if (a.currentTime > 3) a.currentTime = 0;
    else load(idx - 1);
  });

  a.addEventListener('timeupdate', updateProgress);
  a.addEventListener('ended', () => load(idx + 1));
  a.addEventListener('play', () => setIcon(true));
  a.addEventListener('pause', () => setIcon(false));
  a.addEventListener('error', () => setIcon(false));

  /* progress seek */
  let scrubbing = false;
  ui.progress.addEventListener('pointerdown', (e) => {
    scrubbing = true;
    ui.progress.setPointerCapture(e.pointerId);
    seek(e);
  });
  ui.progress.addEventListener('pointermove', (e) => scrubbing && seek(e));
  ui.progress.addEventListener('pointerup', () => { scrubbing = false; });

  setIcon(false);
  load(0);

  /* auto-play after user gesture */
  if (CONFIG.music.autoplay) {
    try {
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) { /* autoplay blocked — fine */ }
  }
}

/* ============================================================================
   WALLET — tabs, click-to-copy, minimal QR
   ============================================================================ */
const WALLETS = [
  { id: 'btc', name: 'BTC', address: CONFIG.crypto.btc },
  { id: 'eth', name: 'ETH', address: CONFIG.crypto.eth },
  { id: 'sol', name: 'SOL', address: CONFIG.crypto.sol },
  { id: 'xmr', name: 'XMR', address: CONFIG.crypto.xmr },
];
let activeWallet = 0;

function drawQR(text) {
  const c = ui.qrCanvas;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const px = 88;
  c.width = px * dpr;
  c.height = px * dpr;
  c.style.width = `${px}px`;
  c.style.height = `${px}px`;
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const n = 25, cell = px / (n + 4), q = cell * 2;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, px, px);

  let seed = 2166136261;
  const h = (c) => { seed = Math.imul(seed ^ c, 16777619) >>> 0; return seed; };
  const inF = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);

  ctx.fillStyle = '#1a1a1a';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (inF(x, y)) continue;
    h(text.charCodeAt((x * n + y) % text.length) ^ (x * 131 + y * 311));
    if ((seed & 0x3f) < 18) ctx.fillRect(q + x * cell, q + y * cell, cell, cell);
  }

  const finder = (fx, fy) => {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(q + fx * cell, q + fy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#fff';
    ctx.fillRect(q + (fx + 1) * cell, q + (fy + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(q + (fx + 2) * cell, q + (fy + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0);
  finder(n - 7, 0);
  finder(0, n - 7);
}

function setWallet(i) {
  activeWallet = i;
  $$('.wallet-tab', ui.walletTabs).forEach((t, j) => t.classList.toggle('active', j === i));
  const w = WALLETS[i];
  ui.walletNetwork.textContent = w.name;
  ui.walletAddress.textContent = w.address;
  drawQR(w.address);
  ui.btnCopy.textContent = 'copy';
  ui.btnCopy.classList.remove('copied');
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e2) { /* noop */ }
    ta.remove();
    return ok;
  }
}

function initWallet() {
  ui.walletTabs.innerHTML = WALLETS.map((w, i) =>
    `<button class="wallet-tab${i === 0 ? ' active' : ''}" role="tab" type="button">${w.name}</button>`
  ).join('');
  $$('.wallet-tab', ui.walletTabs).forEach((t, i) => t.addEventListener('click', () => setWallet(i)));
  setWallet(0);

  ui.btnCopy.addEventListener('click', async () => {
    const ok = await copyText(WALLETS[activeWallet].address);
    if (ok) {
      ui.btnCopy.textContent = 'copied';
      ui.btnCopy.classList.add('copied');
      showToast('Address copied');
      setTimeout(() => {
        ui.btnCopy.textContent = 'copy';
        ui.btnCopy.classList.remove('copied');
      }, 1600);
    }
  });
}

/* ============================================================================
   SOCIAL LINKS — clean pills
   ============================================================================ */
function initSocials() {
  ui.socialsGrid.innerHTML = CONFIG.socials.map(s =>
    `<a class="social-link" href="${s.url}" target="_blank" rel="noopener noreferrer">
      ${svg(ICONS[s.id] || ICONS.discord)}
      <span>${s.label}</span>
    </a>`
  ).join('');
}

/* ============================================================================
   STATS — views + hearts
   ============================================================================ */
function animateNum(el, from, to) {
  const start = performance.now();
  (function step(t) {
    const p = clamp((t - start) / 800, 0, 1);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  })(start);
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
  animateNum(ui.viewCount, Math.max(0, views - 2), views);

  let hearts = parseInt(localStorage.getItem(hk) || '0', 10) || 0;
  let hearted = localStorage.getItem(`${hk}_hearted`) === '1';
  ui.heartCount.textContent = hearts.toLocaleString();

  ui.heartBtn.addEventListener('click', () => {
    hearted = !hearted;
    hearts += hearted ? 1 : -1;
    hearts = Math.max(0, hearts);
    localStorage.setItem(hk, String(hearts));
    localStorage.setItem(`${hk}_hearted`, hearted ? '1' : '0');
    animateNum(ui.heartCount, Math.max(0, hearts - (hearted ? 1 : 0)), hearts);
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
  initSplash();
}

init();
