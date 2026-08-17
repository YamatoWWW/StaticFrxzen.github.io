'use strict';

/* ============================================================================
 *
 *   ███████╗████████╗███████╗██╗     ██╗     ██╗████████╗███████╗
 *   ██╔════╝╚══██╔══╝██╔════╝██║     ██║     ██║╚══██╔══╝██╔════╝
 *   ███████╗   ██║   █████╗  ██║     ██║     ██║   ██║   █████╗
 *   ╚════██║   ██║   ██╔══╝  ██║     ██║     ██║   ██║   ██╔══╝
 *   ███████║   ██║   ███████╗███████╗███████╗██║   ██║   ███████╗
 *   ╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝
 *
 *   CONFIG-DRIVEN ARCHITECTURE — THE ONLY FILE YOU EDIT
 *
 *   Every field below maps directly to the rendered page. The layout
 *   array controls the vertical order of every widget block. Change
 *   the order here and the page rebuilds itself on next load.
 *
 *   To add your own music: drop an .mp3 next to index.html and set
 *   audio_url to './your-track.mp3'.
 *
 *   To add a background image/video: place the file next to index.html
 *   and set background_source to './bg.jpg' or './bg.mp4'.
 *
 * ============================================================================
 */

const SITE_CONFIG = {

  /* ---------- META ---------- */
  meta: {
    page_title: 'FRXZEN',
    meta_description: 'Minimal luxury link-in-bio profile.',
    favicon_url: '',
  },

  /* ---------- THEME ---------- */
  theme: {
    background_type: 'color',       // 'color' | 'gradient' | 'image' | 'video'
    background_source: '',          // URL or relative path (e.g. './bg.jpg', './bg.mp4')
    accent_color: '#ffffff',
    card_style: {
      blur_radius: 16,              // backdrop-filter blur in px
      background_opacity: 0.60,     // 0 to 1
      border_radius: 14,            // px
    },
  },

  /* ---------- PROFILE ---------- */
  profile: {
    avatar_url: 'https://i.pravatar.cc/300?img=5',
    username: 'FRXZEN',
    handle: '@frxzen',
    verified_badge: true,
    quotes: [
      'all systems nominal',
      'code > coffee',
      'probably gaming',
      'writing the future',
      'hacking the mainframe',
    ],
  },

  /* ---------- LAYOUT ORDER ----------
   *  Change the order of strings in this array to reorder widgets.
   *  Available: 'profile', 'social_links', 'discord_widget',
   *             'audio_player', 'wallet', 'stats'
   */
  layout: [
    'profile',
    'social_links',
    'discord_widget',
    'audio_player',
    'wallet',
    'stats',
  ],

  /* ---------- DISCORD (Lanyard API) ---------- */
  discord: {
    enabled: true,
    discord_id: '',                 // Your Discord snowflake ID (numbers only)
  },

  /* ---------- MUSIC ---------- */
  music: {
    enabled: true,
    audio_url: '',                  // Relative: './track.mp3'  or  full URL
    track_name: 'Neon Drive',
    artist_name: 'FRXZEN',
    art_url: '',                    // Album art URL (leave '' for placeholder)
  },

  /* ---------- SOCIALS ---------- */
  socials: [
    {
      platform: 'Discord',
      url: 'https://discord.com/users/000',
      icon_svg: 'discord',
      tooltip_text: 'Message me',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/frxzen',
      icon_svg: 'github',
      tooltip_text: 'Open source',
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/frxzen',
      icon_svg: 'telegram',
      tooltip_text: 'Chat on Telegram',
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@frxzen',
      icon_svg: 'tiktok',
      tooltip_text: 'Follow on TikTok',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/frxzen',
      icon_svg: 'instagram',
      tooltip_text: 'Photos & stories',
    },
    {
      platform: 'Steam',
      url: 'https://steamcommunity.com/id/frxzen',
      icon_svg: 'steam',
      tooltip_text: 'Gaming profile',
    },
  ],

  /* ---------- WALLET ---------- */
  wallet: {
    enabled: true,
    addresses: {
      btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      sol: 'FRXZENw4V8d3p7u9r5WmBqT2LxJk7Yz8Nq3Pt6Hs5V9',
      xmr: '48Rw3Np1f2Xq9Lm7Kb5Yt6Zu4Dc8Ve2Bg3Ha7Jd9Qe5Tr7Bk2Yf4Lg6Mx8Wn9Pz4Qs6',
    },
  },

  /* ---------- STATS ---------- */
  stats: {
    enabled: true,
    views_key: 'site_views',
    hearts_key: 'site_hearts',
  },

  /* ---------- FOOTER ---------- */
  footer: {
    text: 'built with config-driven architecture',
  },
};

/* ============================================================================
   HELPERS
   ============================================================================ */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const esc = (s) => {
  const el = document.createElement('span');
  el.textContent = s;
  return el.innerHTML;
};

const svg = (d) =>
  `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;

/* ============================================================================
   ICON PATHS (24×24 viewBox)
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
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  music_note: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  verified: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
};

/* ============================================================================
   DOM REFS
   ============================================================================ */
const ui = {
  splash: $('#splash'),
  splashName: $('#splash-name'),
  bgContainer: $('#bg-container'),
  app: $('#app'),
  toast: $('#toast'),
  audio: $('#audio-engine'),
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
   SPLASH SCREEN
   ============================================================================ */
let hasEntered = false;

function enterSite() {
  if (hasEntered) return;
  hasEntered = true;

  /* Attempt audio init — wrapped in try/catch so a broken URL
     never prevents the user from entering the profile. */
  try {
    initMusicPlayer();
  } catch (err) {
    /* silent: audio failure does not block entry */
  }

  /* Fade out splash */
  ui.splash.classList.add('fade-out');

  /* After the CSS transition completes, remove splash from DOM
     and reveal the profile card. */
  const onEnd = () => {
    ui.splash.removeEventListener('transitionend', onEnd);
    ui.splash.remove();
    ui.app.classList.add('visible');

    /* Stagger-reveal each widget section */
    $$('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${60 + i * 65}ms`);
      el.classList.add('in');
    });
  };
  ui.splash.addEventListener('transitionend', onEnd);

  /* Safety fallback: if transitionend never fires (e.g. display:none),
     force reveal after 700ms. */
  setTimeout(() => {
    if (!ui.app.classList.contains('visible')) {
      ui.splash.remove();
      ui.app.classList.add('visible');
      $$('[data-reveal]').forEach((el, i) => {
        el.style.setProperty('--d', `${60 + i * 65}ms`);
        el.classList.add('in');
      });
    }
  }, 700);
}

function initSplash() {
  ui.splashName.textContent = SITE_CONFIG.profile.username;
  ui.splash.addEventListener('click', enterSite);
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !hasEntered) {
      e.preventDefault();
      enterSite();
    }
  });
}

/* ============================================================================
   BACKGROUND
   ============================================================================ */
function initBackground() {
  const theme = SITE_CONFIG.theme;
  const container = ui.bgContainer;

  /* Apply theme CSS variables to :root */
  const root = document.documentElement;
  if (theme.accent_color) {
    root.style.setProperty('--accent', theme.accent_color);
  }
  if (theme.card_style) {
    const cs = theme.card_style;
    root.style.setProperty('--card-blur', `blur(${cs.blur_radius}px)`);
    root.style.setProperty('--card-bg', `rgba(18, 18, 18, ${cs.background_opacity})`);
    root.style.setProperty('--card-radius', `${cs.border_radius}px`);
  }

  /* Build background based on type */
  const type = theme.background_type;
  const src = theme.background_source;

  if (type === 'video' && src) {
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('aria-hidden', 'true');
    video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;';
    video.onerror = () => video.remove();
    container.appendChild(video);

    const overlay = document.createElement('div');
    overlay.className = 'bg-overlay';
    container.appendChild(overlay);
  } else if (type === 'image' && src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.18;';
    img.onerror = () => img.remove();
    container.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'bg-overlay';
    container.appendChild(overlay);
  } else if (type === 'gradient' && src) {
    container.style.background = src;
  }
  /* type === 'color' → default body background, no action needed */
}

/* ============================================================================
   WIDGET BUILDERS — each returns an HTML string
   ============================================================================ */

function buildProfileBlock() {
  const p = SITE_CONFIG.profile;
  const verifiedHTML = p.verified_badge
    ? `<span class="profile-verified">${svg(ICONS.verified)}</span>`
    : '';

  return `
    <section class="section profile-block" data-reveal>
      <div class="profile-avatar-wrap">
        <img class="profile-avatar" src="${esc(p.avatar_url)}" alt="${esc(p.username)}" />
        ${verifiedHTML}
      </div>
      <h1 class="profile-name">${esc(p.username)}</h1>
      <p class="profile-handle">${esc(p.handle)}</p>
      <div class="typewriter-row">
        <span class="typewriter-text" id="typewriter"></span>
        <span class="typewriter-caret"></span>
      </div>
    </section>`;
}

function buildSocialLinksBlock() {
  const links = SITE_CONFIG.socials.map((s) => {
    const iconPath = ICONS[s.icon_svg] || ICONS.discord;
    return `
      <a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" data-tooltip="${esc(s.tooltip_text)}">
        ${svg(iconPath)}
        <span>${esc(s.platform)}</span>
      </a>`;
  }).join('');

  return `
    <section class="section" data-reveal>
      <p class="section-label">Socials</p>
      <div class="socials-grid">${links}</div>
    </section>`;
}

function buildDiscordBlock() {
  const dc = SITE_CONFIG.discord;
  if (!dc.enabled || !dc.discord_id) return '';

  return `
    <section class="section discord-block" data-reveal>
      <p class="section-label">Discord</p>
      <div class="discord-user" id="discord-user">
        <div class="discord-avatar-wrap">
          <img class="discord-avatar" id="dc-avatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%231a1a1a' width='24' height='24' rx='6'/%3E%3C/svg%3E" alt="discord avatar" />
          <span class="discord-status offline" id="dc-status"></span>
        </div>
        <div class="discord-meta">
          <span class="discord-name" id="dc-name">Loading…</span>
          <span class="discord-custom" id="dc-custom"></span>
        </div>
      </div>
      <div id="dc-presence"></div>
    </section>`;
}

function buildAudioPlayerBlock() {
  const m = SITE_CONFIG.music;
  if (!m.enabled) return '';

  const artHTML = m.art_url
    ? `<div class="player-art"><img src="${esc(m.art_url)}" alt="art" /></div>`
    : `<div class="player-art"><div class="player-art-placeholder">${svg(ICONS.music_note)}</div></div>`;

  return `
    <section class="section player-block" data-reveal>
      <p class="section-label">Music</p>
      <div class="player-row">
        ${artHTML}
        <div class="player-info">
          <span class="player-title" id="player-title">${esc(m.track_name)}</span>
          <span class="player-artist" id="player-artist">${esc(m.artist_name)}</span>
        </div>
        <button class="player-play" id="btn-play" type="button" aria-label="play">${svg(ICONS.play)}</button>
      </div>
      <div class="player-progress-wrap">
        <div class="player-progress" id="player-progress">
          <div class="player-progress-fill" id="player-fill"></div>
        </div>
        <div class="player-times">
          <span id="player-current">0:00</span>
          <span id="player-total">0:00</span>
        </div>
      </div>
    </section>`;
}

function buildWalletBlock() {
  const w = SITE_CONFIG.wallet;
  if (!w.enabled) return '';

  const coins = [
    { key: 'btc', name: 'BTC' },
    { key: 'eth', name: 'ETH' },
    { key: 'sol', name: 'SOL' },
    { key: 'xmr', name: 'XMR' },
  ];

  const tabs = coins.map((c, i) =>
    `<button class="wallet-tab${i === 0 ? ' active' : ''}" data-coin="${c.key}" type="button">${c.name}</button>`
  ).join('');

  return `
    <section class="section" data-reveal>
      <p class="section-label">Wallet</p>
      <div class="wallet-tabs" id="wallet-tabs">${tabs}</div>
      <div class="wallet-row">
        <canvas class="wallet-qr" id="wallet-qr" aria-hidden="true"></canvas>
        <div class="wallet-info">
          <span class="wallet-network" id="wallet-network">${coins[0].name}</span>
          <span class="wallet-addr" id="wallet-addr">${esc(w.addresses[coins[0].key])}</span>
          <button class="wallet-copy" id="btn-copy" type="button">copy</button>
        </div>
      </div>
    </section>`;
}

function buildStatsBlock() {
  const s = SITE_CONFIG.stats;
  if (!s.enabled) return '';

  return `
    <section class="section stats-bar" data-reveal>
      <div class="stat">
        <span class="stat-num" id="stat-views">0</span>
        <span class="stat-lbl">Views</span>
      </div>
      <div class="stat-divider"></div>
      <button class="stat stat-heart" id="stat-heart-btn" type="button">
        <span class="stat-num" id="stat-hearts">0</span>
        <span class="stat-lbl">Hearts</span>
      </button>
    </section>`;
}

function buildFooterBlock() {
  return `
    <section class="section footer-section" data-reveal>
      ${esc(SITE_CONFIG.footer.text)}
    </section>`;
}

/* ============================================================================
   LAYOUT RENDERER — reads SITE_CONFIG.layout and builds the card
   ============================================================================ */
const WIDGET_MAP = {
  profile: buildProfileBlock,
  social_links: buildSocialLinksBlock,
  discord_widget: buildDiscordBlock,
  audio_player: buildAudioPlayerBlock,
  wallet: buildWalletBlock,
  stats: buildStatsBlock,
};

function renderLayout() {
  const container = document.createElement('div');
  container.className = 'card';

  const layout = SITE_CONFIG.layout;
  for (let i = 0; i < layout.length; i++) {
    const key = layout[i];
    const builder = WIDGET_MAP[key];
    if (builder) {
      const html = builder();
      if (html) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        while (wrapper.firstChild) {
          container.appendChild(wrapper.firstChild);
        }
      }
    }
  }

  /* Append footer outside the card */
  const footerHTML = buildFooterBlock();

  ui.app.innerHTML = '';
  ui.app.appendChild(container);

  const footerWrap = document.createElement('div');
  footerWrap.innerHTML = footerHTML;
  while (footerWrap.firstChild) {
    ui.app.appendChild(footerWrap.firstChild);
  }
}

/* ============================================================================
   TYPEWRITER — rotates quotes from config
   ============================================================================ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const quotes = SITE_CONFIG.profile.quotes;
  if (!quotes.length) return;

  let qi = 0, ci = 0, deleting = false, text = '';

  function tick() {
    const current = quotes[qi];
    if (!deleting) {
      ci++;
      text = current.slice(0, ci);
      el.textContent = text;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 48);
    } else {
      ci--;
      text = current.slice(0, ci);
      el.textContent = text;
      if (ci === 0) {
        deleting = false;
        qi = (qi + 1) % quotes.length;
        setTimeout(tick, 280);
        return;
      }
      setTimeout(tick, 22);
    }
  }
  tick();
}

/* ============================================================================
   DISCORD — Lanyard API integration
   ============================================================================ */
const STATUS_COLORS = {
  online: 'online',
  idle: 'idle',
  dnd: 'dnd',
  offline: 'offline',
};

async function fetchDiscordPresence() {
  const dc = SITE_CONFIG.discord;
  if (!dc.enabled || !dc.discord_id) return;

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`https://api.lanyard.rest/v1/users/${dc.discord_id}`, {
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data;
    if (!data) throw new Error('No data');

    /* --- User info --- */
    const avatar = data.discord_user.avatar;
    const username = data.discord_user.username;
    const dcAvatar = document.getElementById('dc-avatar');
    const dcName = document.getElementById('dc-name');
    const dcCustom = document.getElementById('dc-custom');
    const dcStatus = document.getElementById('dc-status');

    if (dcAvatar && avatar) {
      dcAvatar.src = `https://cdn.discordapp.com/avatars/${dc.discord_user.id}/${avatar}.png?size=128`;
    }
    if (dcName) dcName.textContent = username;

    /* Custom status (type 4) */
    const customAct = (data.activities || []).find((a) => a.type === 4);
    if (dcCustom) {
      dcCustom.textContent = customAct && customAct.state ? customAct.state : '';
    }

    /* Status dot */
    const status = data.discord_status || 'offline';
    if (dcStatus) {
      dcStatus.className = `discord-status ${STATUS_COLORS[status] || 'offline'}`;
    }

    /* --- Rich Presence --- */
    const presenceEl = document.getElementById('dc-presence');
    if (!presenceEl) return;

    /* Filter for type 0 (Playing) or type 2 (Listening) activities */
    const activities = (data.activities || []).filter((a) => a.type === 0 || a.type === 2);

    if (activities.length === 0) {
      presenceEl.innerHTML = `<p class="discord-placeholder">Currently doing nothing</p>`;
      return;
    }

    /* Use the first non-custom activity */
    const act = activities[0];
    const actType = act.type === 2 ? 'Listening to' : 'Playing';
    const actName = act.name || 'Unknown';
    const actDetails = act.details || '';
    const actState = act.state || '';

    /* Build activity image from Lanyard CDN */
    let artSrc = '';
    if (act.assets) {
      const largeKey = act.assets.large_image;
      const appId = act.application_id;
      if (largeKey && appId) {
        if (largeKey.startsWith('mp:')) {
          artSrc = `https://media.discordapp.net/${largeKey.slice(3)}?size=128`;
        } else {
          artSrc = `https://cdn.discordapp.com/app-assets/${appId}/${largeKey}.png?size=128`;
        }
      }
    }

    /* Elapsed time */
    let elapsedHTML = '';
    if (act.timestamps && act.timestamps.start) {
      const elapsedSec = Math.floor((Date.now() - act.timestamps.start) / 1000);
      const em = Math.floor(elapsedSec / 60);
      const es = elapsedSec % 60;
      elapsedHTML = `<span class="rp-state">${em}:${String(es).padStart(2, '0')} elapsed</span>`;
    }

    const artHTML = artSrc
      ? `<img class="rp-art" src="${esc(artSrc)}" alt="activity art" />`
      : '';

    presenceEl.innerHTML = `
      <div class="rich-presence">
        ${artHTML}
        <div class="rp-info">
          <span class="rp-type">${esc(actType)}</span>
          <span class="rp-name">${esc(actName)}</span>
          ${actDetails ? `<span class="rp-detail">${esc(actDetails)}</span>` : ''}
          ${actState ? `<span class="rp-state">${esc(actState)}</span>` : ''}
          ${elapsedHTML}
        </div>
      </div>`;
  } catch (err) {
    /* API failed — show fallback placeholder */
    const presenceEl = document.getElementById('dc-presence');
    if (presenceEl) {
      presenceEl.innerHTML = `<p class="discord-placeholder">Currently doing nothing</p>`;
    }
    const dcName = document.getElementById('dc-name');
    if (dcName) dcName.textContent = SITE_CONFIG.discord.discord_id ? 'User' : '';
  }

  /* Poll every 30 seconds */
  setTimeout(fetchDiscordPresence, 30000);
}

/* ============================================================================
   MUSIC PLAYER — play/pause, progress, seek, time display
   ============================================================================ */
let playerReady = false;

function initMusicPlayer() {
  const m = SITE_CONFIG.music;
  if (!m.enabled || !m.audio_url) return;

  const audio = ui.audio;
  audio.volume = 0.7;

  /* Set source */
  audio.src = m.audio_url;

  /* DOM refs (only exist if the block was rendered) */
  const btnPlay = document.getElementById('btn-play');
  const progressEl = document.getElementById('player-progress');
  const fillEl = document.getElementById('player-fill');
  const currentEl = document.getElementById('player-current');
  const totalEl = document.getElementById('player-total');

  if (!btnPlay) return;
  playerReady = true;

  /* ---------- Play / Pause ---------- */
  function setPlayIcon(playing) {
    btnPlay.innerHTML = svg(playing ? ICONS.pause : ICONS.play);
  }

  btnPlay.addEventListener('click', () => {
    try {
      if (audio.paused) {
        const p = audio.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } else {
        audio.pause();
      }
    } catch (e) {
      /* audio API error — ignore */
    }
  });

  audio.addEventListener('play', () => setPlayIcon(true));
  audio.addEventListener('pause', () => setPlayIcon(false));
  audio.addEventListener('ended', () => setPlayIcon(false));

  /* ---------- Time updates ---------- */
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    fillEl.style.width = pct + '%';
    currentEl.textContent = fmtTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    totalEl.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('error', () => {
    totalEl.textContent = '0:00';
    setPlayIcon(false);
  });

  /* ---------- Seek on progress click/drag ---------- */
  let scrubbing = false;

  function seekFromEvent(e) {
    if (!audio.duration || !progressEl) return;
    const rect = progressEl.getBoundingClientRect();
    const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    audio.currentTime = pct * audio.duration;
    fillEl.style.width = (pct * 100) + '%';
    currentEl.textContent = fmtTime(audio.currentTime);
  }

  if (progressEl) {
    progressEl.addEventListener('pointerdown', (e) => {
      scrubbing = true;
      progressEl.setPointerCapture(e.pointerId);
      seekFromEvent(e);
    });
    progressEl.addEventListener('pointermove', (e) => {
      if (scrubbing) seekFromEvent(e);
    });
    progressEl.addEventListener('pointerup', () => {
      scrubbing = false;
    });
  }
}

/* ============================================================================
   WALLET — tab switching, QR generation, copy to clipboard
   ============================================================================ */
const WALLET_COINS = [
  { key: 'btc', name: 'BTC' },
  { key: 'eth', name: 'ETH' },
  { key: 'sol', name: 'SOL' },
  { key: 'xmr', name: 'XMR' },
];

let walletActiveCoin = 'btc';

function generateQR(text) {
  const canvas = document.getElementById('wallet-qr');
  if (!canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = 76;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const n = 25;
  const cell = size / (n + 4);
  const q = cell * 2;

  /* White background */
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  /* Deterministic pseudo-random hash from text */
  let seed = 2166136261;
  const hash = (c) => {
    seed = Math.imul(seed ^ c, 16777619) >>> 0;
    return seed;
  };

  /* Check if position is inside a finder pattern */
  const inFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);

  /* Draw data modules */
  ctx.fillStyle = '#1a1a1a';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y)) continue;
      hash(text.charCodeAt((x * n + y) % text.length) ^ (x * 131 + y * 311));
      if ((seed & 0x3f) < 18) {
        ctx.fillRect(q + x * cell, q + y * cell, cell, cell);
      }
    }
  }

  /* Draw finder patterns (3 corners) */
  const drawFinder = (fx, fy) => {
    /* Outer border */
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(q + fx * cell, q + fy * cell, 7 * cell, 7 * cell);
    /* Inner white */
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(q + (fx + 1) * cell, q + (fy + 1) * cell, 5 * cell, 5 * cell);
    /* Center dot */
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(q + (fx + 2) * cell, q + (fy + 2) * cell, 3 * cell, 3 * cell);
  };

  drawFinder(0, 0);
  drawFinder(n - 7, 0);
  drawFinder(0, n - 7);
}

function setWalletCoin(key) {
  walletActiveCoin = key;
  const w = SITE_CONFIG.wallet;

  /* Update tabs */
  $$('.wallet-tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.coin === key);
  });

  /* Update network label */
  const networkEl = document.getElementById('wallet-network');
  if (networkEl) {
    const coin = WALLET_COINS.find((c) => c.key === key);
    networkEl.textContent = coin ? coin.name : key.toUpperCase();
  }

  /* Update address */
  const addrEl = document.getElementById('wallet-addr');
  if (addrEl) {
    addrEl.textContent = w.addresses[key] || '';
  }

  /* Regenerate QR */
  if (w.addresses[key]) {
    generateQR(w.addresses[key]);
  }
}

function initWallet() {
  if (!SITE_CONFIG.wallet.enabled) return;

  /* Tab click listeners */
  $$('.wallet-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      setWalletCoin(tab.dataset.coin);
    });
  });

  /* Copy button */
  const copyBtn = document.getElementById('btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const addr = SITE_CONFIG.wallet.addresses[walletActiveCoin];
      if (!addr) return;

      let ok = false;
      try {
        await navigator.clipboard.writeText(addr);
        ok = true;
      } catch (e) {
        /* Fallback for older browsers or insecure contexts */
        const ta = document.createElement('textarea');
        ta.value = addr;
        ta.style.cssText = 'position:fixed;opacity:0;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand('copy');
        } catch (e2) {
          ok = false;
        }
        ta.remove();
      }

      if (ok) {
        copyBtn.textContent = 'copied';
        copyBtn.classList.add('copied');
        showToast('Address copied to clipboard');
        setTimeout(() => {
          copyBtn.textContent = 'copy';
          copyBtn.classList.remove('copied');
        }, 1600);
      }
    });
  }

  /* Draw initial QR */
  const firstKey = WALLET_COINS[0].key;
  if (SITE_CONFIG.wallet.addresses[firstKey]) {
    generateQR(SITE_CONFIG.wallet.addresses[firstKey]);
  }
}

/* ============================================================================
   STATS — persistent view counter + toggleable hearts
   ============================================================================ */
function animateNumber(el, from, to) {
  if (!el) return;
  const start = performance.now();
  const duration = 750;
  function step(now) {
    const p = clamp((now - start) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initStats() {
  if (!SITE_CONFIG.stats.enabled) return;

  const vk = SITE_CONFIG.stats.views_key;
  const hk = SITE_CONFIG.stats.hearts_key;
  const viewsEl = document.getElementById('stat-views');
  const heartsEl = document.getElementById('stat-hearts');
  const heartBtn = document.getElementById('stat-heart-btn');

  /* --- Views --- */
  let views = parseInt(localStorage.getItem(vk) || '0', 10) || 0;
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(vk + '_day');
  if (lastVisit !== today) {
    views += 1;
    localStorage.setItem(vk, String(views));
    localStorage.setItem(vk + '_day', today);
  }
  if (viewsEl) {
    animateNumber(viewsEl, Math.max(0, views - 3), views);
  }

  /* --- Hearts --- */
  let hearts = parseInt(localStorage.getItem(hk) || '0', 10) || 0;
  let hearted = localStorage.getItem(hk + '_on') === '1';

  if (heartsEl) {
    heartsEl.textContent = hearts.toLocaleString();
  }

  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      hearted = !hearted;
      hearts += hearted ? 1 : -1;
      hearts = Math.max(0, hearts);
      localStorage.setItem(hk, String(hearts));
      localStorage.setItem(hk + '_on', hearted ? '1' : '0');
      if (heartsEl) {
        animateNumber(heartsEl, Math.max(0, hearts - (hearted ? 1 : 0)), hearts);
      }
    });
  }
}

/* ============================================================================
   META — apply config to <head>
   ============================================================================ */
function applyMeta() {
  const meta = SITE_CONFIG.meta;
  if (meta.page_title) document.title = meta.page_title;
  if (meta.meta_description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = meta.meta_description;
  }
  if (meta.favicon_url) {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = meta.favicon_url;
  }
}

/* ============================================================================
   BOOT
   ============================================================================ */
function boot() {
  applyMeta();
  initBackground();
  renderLayout();
  initSplash();
  initTypewriter();
  initWallet();
  initStats();
  fetchDiscordPresence();
}

boot();
