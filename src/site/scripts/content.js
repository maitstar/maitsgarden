// ─── Garden Config — edit to connect your services ───

const CONFIG = {
  obsidian: {
    enabled: true,
    tagMap: {
      'deep-dives':  'deep-dives',
      'curiosities': 'curiosities',
      'projects':    'projects',
      'updates':     'updates',
      'writing':     'writing',
    }
  },
  openLibrary: { username: '', enabled: false },
  substack:    { url: '', enabled: false },
  spotify: {
    playlists: [],
    enabled: false,
  },
  writing: {
    medium:   '',
    substack: '',
    linkedin: 'https://linkedin.com/in/maitreyi-menon',
  },
  contact: {
    email:    'hello@maitreyi.garden',
    linkedin: 'https://linkedin.com/in/maitreyi-menon',
    twitter:  '',
    substack: '',
  }
};

// ─── Static / fallback content per zone ───

const STATIC_CONTENT = {

  about: {
    icon: '🌿', title: 'About Me',
    html: `
      <p>Hey — I'm Mait. Building a career at the intersection of <strong>capital markets, climate technology, and global development</strong>.</p>
      <p>Fellow at Columbia's Center on Global Energy Policy (CGEP) and Climate &amp; Knowledge Initiative (CKI). Co-founder of <strong>CleanCrop</strong> — methane reduction / carbon credits.</p>
      <p>This garden is my thinking made public. Ideas I'm growing, notes I'm processing, things I find genuinely weird and wonderful.</p>
      <div class="contact-row">
        <a class="contact-btn" href="${CONFIG.contact.linkedin}" target="_blank">LinkedIn</a>
        <a class="contact-btn" href="${CONFIG.writing.substack||'#'}" target="_blank">Substack</a>
        <a class="contact-btn" href="mailto:${CONFIG.contact.email}">Email</a>
      </div>`
  },

  writing: {
    icon: '🩵', title: 'Writing',
    obsidianTag: 'writing',
    fallback: `<p>Essays, threads, dispatches — thinking made permanent.</p><p><em>Coming soon.</em></p>`,
    html: `
      <p>Essays, threads, dispatches — thinking made permanent.</p>
      <div id="writing-feed"><div class="loading-dots">loading ···</div></div>
      <div class="contact-row" style="margin-top:12px;">
        ${CONFIG.writing.substack ? `<a class="contact-btn" href="${CONFIG.writing.substack}" target="_blank">Substack</a>` : ''}
        ${CONFIG.writing.linkedin ? `<a class="contact-btn" href="${CONFIG.writing.linkedin}" target="_blank">LinkedIn</a>` : ''}
      </div>`,
    onOpen: 'loadWriting'
  },

  'deep-dives': {
    icon: '💜', title: 'Deep Dives',
    obsidianTag: 'deep-dives',
    fallback: `
      <p>Permanent notes — ideas I've processed and believe enough to write down properly.</p>
      <div class="note-card"><h3>Identity &amp; Values</h3><p>Schwartz profile: Self-direction, Stimulation, Security. The tension between wanting change and needing stability.</p><span class="modal-tag">identity</span><span class="modal-tag">values</span></div>
      <div class="note-card"><h3>ADHD Voltage Model</h3><p>ADHD as a voltage regulation problem — managing high-energy states, crashes, and environment design.</p><span class="modal-tag">adhd</span><span class="modal-tag">systems</span></div>
      <div class="note-card"><h3>Impact Finance</h3><p>Blended finance, catalytic capital, carbon markets. How money actually moves toward hard problems.</p><span class="modal-tag">climate</span><span class="modal-tag">finance</span></div>
      <div class="note-card"><h3>Mental Models</h3><p>Pre-mortem, inversion, surface area for luck. The thinking tools I return to most.</p><span class="modal-tag">mind</span><span class="modal-tag">models</span></div>`
  },

  projects: {
    icon: '🏰', title: 'Projects',
    obsidianTag: 'projects',
    fallback: `
      <div class="note-card"><h3>CleanCrop</h3><p>Methane reduction protocols for agriculture that generate carbon credits.</p><span class="modal-tag">climate</span><span class="modal-tag">active</span></div>
      <div class="note-card"><h3>Columbia CGEP Fellowship</h3><p>Blended finance for climate tech in emerging markets.</p><span class="modal-tag">research</span><span class="modal-tag">active</span></div>
      <div class="note-card"><h3>BCN App</h3><p>Making financial modelling accessible. Spec in progress.</p><span class="modal-tag">product</span></div>`
  },

  reading: {
    icon: '📚', title: 'Reading',
    html: `<div id="reading-content"><div class="loading-dots">fetching shelf ···</div></div>`,
    onOpen: 'loadReading'
  },

  playlists: {
    icon: '🎵', title: 'Playlists',
    html: `<div id="playlists-content"><div class="loading-dots">loading ···</div></div>`,
    onOpen: 'loadPlaylists'
  },

  updates: {
    icon: '📬', title: 'Now',
    obsidianTag: 'updates',
    fallback: `
      <p>What I'm up to — Q2 2026.</p>
      <ul>
        <li>Job search: Impact VC, ESG, blended finance, DFI</li>
        <li>Financial modelling: climate &amp; impact finance models</li>
        <li>CleanCrop: methane reduction / carbon credit development</li>
        <li>Writing: impact finance thought leadership</li>
      </ul>`
  },

  stay: {
    icon: '❤️', title: 'Stay in Touch',
    html: `
      <p>I like interesting people. If something here resonated — say hi.</p>
      <div class="contact-row">
        <a class="contact-btn" href="mailto:${CONFIG.contact.email}">✉ Email</a>
        <a class="contact-btn" href="${CONFIG.contact.linkedin}" target="_blank">LinkedIn</a>
        ${CONFIG.contact.twitter ? `<a class="contact-btn" href="${CONFIG.contact.twitter}" target="_blank">X</a>` : ''}
        ${CONFIG.contact.substack ? `<a class="contact-btn" href="${CONFIG.contact.substack}" target="_blank">Substack</a>` : ''}
      </div>
      <p style="margin-top:16px;">Best for: climate finance, blended finance, impact VC, interesting conversations about systems, ADHD, or why capital markets are broken in interesting ways.</p>`
  },

  curiosities: {
    icon: '✨', title: 'Curiosities',
    obsidianTag: 'curiosities',
    fallback: `
      <p>Things I find genuinely fascinating — no theme, just stuff that lights up my brain.</p>
      <div class="note-card"><h3>Status as a Service</h3><p>Eugene Wei: every social network is secretly a status economy.</p><span class="modal-tag">social</span><span class="modal-tag">systems</span></div>
      <div class="note-card"><h3>Tao of Physics</h3><p>Quantum field theory meets Eastern mysticism. Written 1975. Still shocking.</p><span class="modal-tag">physics</span><span class="modal-tag">philosophy</span></div>
      <div class="note-card"><h3>Surface Area for Luck</h3><p>Luck ∝ bets placed. More outputs = more surface area for something to hit.</p><span class="modal-tag">career</span><span class="modal-tag">probability</span></div>`
  },
};
