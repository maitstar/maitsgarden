// ─── Mait's Garden Engine ───

const world      = document.getElementById('gardenWorld');
const charEl     = document.getElementById('character');
const charFlip   = document.getElementById('charFlip');
const charSprite = document.getElementById('charSprite');
const promptEl   = document.getElementById('proximityPrompt');
const overlay    = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalInner = document.getElementById('modalInner');

let pos = { x: 50, y: 48 };
let vel = { x: 0,  y: 0  };
const SPEED = 0.16;
const keys  = {};

let direction  = 'down';
let walkFrame  = 0;
let walkTimer  = 0;
const WALK_FPS = 10;

let nearbyZone = null;
let isOpen     = false;

let obsidianNotes = {};
let obsidianReady = false;

// ─── All zones ───
const ZONES = [
  { id: 'about',         x: 50, y: 40 },
  { id: 'identity',      x: 12, y: 18 },
  { id: 'mait-isms',     x: 28, y: 10 },
  { id: 'writing',       x: 45, y: 16 },
  { id: 'career',        x: 65, y: 18 },
  { id: 'mind',          x: 84, y: 14 },
  { id: 'book-notes',    x: 20, y: 32 },
  { id: 'playlists',     x: 62, y: 30 },
  { id: 'health',        x: 85, y: 40 },
  { id: 'spirituality',  x:  7, y: 44 },
  { id: 'technology',    x: 70, y: 50 },
  { id: 'productivity',  x: 86, y: 62 },
  { id: 'climate',       x: 14, y: 58 },
  { id: 'reading',       x: 76, y: 62 },
  { id: 'finance',       x: 11, y: 74 },
  { id: 'creative',      x: 36, y: 74 },
  { id: 'relationships', x: 60, y: 74 },
  { id: 'updates',       x: 50, y: 82 },
  { id: 'stay',          x: 28, y: 84 },
];

// ─── Obsidian live sync ───
async function fetchObsidianNotes() {
  try {
    const res = await fetch('/searchIndex.json', { cache: 'no-store' });
    if (!res.ok) return;
    const notes = await res.json();
    notes.forEach(note => {
      (note.tags || []).forEach(raw => {
        const tag = raw.toLowerCase().replace(/\s+/g, '-');
        if (!obsidianNotes[tag]) obsidianNotes[tag] = [];
        obsidianNotes[tag].push({
          title:   note.title || 'Untitled',
          url:     note.url   || '#',
          excerpt: (note.content || '').replace(/[#*`\[\]]/g, '').trim().slice(0, 130),
        });
      });
    });
    obsidianReady = true;
    ZONES.forEach(z => {
      const cfg = STATIC_CONTENT[z.id];
      if (!cfg) return;
      const tag = cfg.obsidianTag || z.id;
      const n   = obsidianNotes[tag];
      if (n?.length) {
        const el = document.querySelector('#zone-' + z.id + ' .zone-count');
        if (el) el.textContent = '·' + n.length;
      }
    });
  } catch { /* standalone mode */ }
}

// ─── External integrations ───
async function loadReading() {
  const el = document.getElementById('reading-content');
  if (!el) return;
  const books = [
    { title: 'The Tao of Physics',            author: 'Fritjof Capra',   status: '★ loved'  },
    { title: 'Essentialism',                  author: 'Greg McKeown',    status: '★ loved'  },
    { title: 'How to Live',                   author: 'Derek Sivers',    status: 'reading'  },
    { title: 'The 48 Laws of Power',          author: 'Robert Greene',   status: 'reading'  },
    { title: 'History of the Persian Empire', author: 'A.T. Olmstead',   status: 'to read'  },
    { title: 'Riding the Tiger',              author: 'Julius Evola',    status: 'to read'  },
  ];
  el.innerHTML = books.map(b => `
    <div class="note-card" style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div><h3 style="margin-bottom:3px;">${b.title}</h3><p style="margin:0;">${b.author}</p></div>
      <span class="modal-tag" style="flex-shrink:0;">${b.status}</span>
    </div>`).join('');
}

async function loadPlaylists() {
  const el = document.getElementById('playlists-content');
  if (!el) return;
  if (!CONFIG.spotify.enabled || !CONFIG.spotify.playlists.length) {
    el.innerHTML = `<p>Paste your Spotify playlist IDs into <code>scripts/content.js → CONFIG.spotify.playlists</code>.</p>
      <p style="font-size:16px;color:#7a6040;margin-top:8px;">Get the ID from: open.spotify.com/playlist/<strong>← this part</strong></p>`;
    return;
  }
  el.innerHTML = CONFIG.spotify.playlists.map(p => `
    <div style="margin-bottom:14px;">
      <div class="modal-tag" style="margin-bottom:6px;">${p.label || 'playlist'}</div>
      <iframe src="https://open.spotify.com/embed/playlist/${p.id}?theme=0"
        width="100%" height="152" frameborder="0"
        allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture"
        style="border-radius:4px;"></iframe>
    </div>`).join('');
}

async function loadWriting() {
  const el = document.getElementById('writing-feed');
  if (!el) return;
  const obs = obsidianNotes['writing'] || obsidianNotes['essays'] || [];
  let html = obs.map(n => `
    <div class="note-card">
      <h3><a href="${n.url}" style="color:#f5e6c8;text-decoration:none;">${n.title}</a></h3>
      ${n.excerpt ? `<p>${n.excerpt}…</p>` : ''}
    </div>`).join('');
  if (CONFIG.substack.enabled && CONFIG.substack.url) {
    try {
      const r = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(CONFIG.substack.url));
      if (r.ok) {
        const d = await r.json();
        html += (d.items || []).slice(0, 5).map(item => `
          <div class="note-card">
            <h3><a href="${item.link}" target="_blank" style="color:#f5e6c8;text-decoration:none;">${item.title}</a></h3>
            <p style="font-size:16px;color:#8a6040;">${new Date(item.pubDate).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</p>
          </div>`).join('');
      }
    } catch { }
  }
  el.innerHTML = html || '<p>Writing coming soon.</p>';
}

// ─── Modal ───
function buildModalHTML(zoneId) {
  const cfg = STATIC_CONTENT[zoneId];
  if (!cfg) return '<p>Coming soon.</p>';
  const tag   = cfg.obsidianTag || zoneId;
  const notes = obsidianNotes[tag] || [];
  const badge = obsidianReady && notes.length
    ? `<span class="modal-tag" style="float:right;background:#1a3a1a;border-color:#2a6a2a;color:#6aaa6a;font-size:5px;">● live</span>` : '';

  let body = '';
  if (notes.length) {
    body = notes.map(n => `
      <div class="note-card">
        <h3><a href="${n.url}" style="color:#f5e6c8;text-decoration:none;font-family:'Press Start 2P',monospace;font-size:7px;">${n.title}</a></h3>
        ${n.excerpt ? `<p>${n.excerpt}…</p>` : ''}
      </div>`).join('');
    if (cfg.fallback) body += '<hr style="border:none;border-top:1px solid #3a2a12;margin:14px 0;">' + cfg.fallback;
  } else if (cfg.html) {
    body = cfg.html;
  } else if (cfg.fallback) {
    body = cfg.fallback;
  }

  return `<h2><span>${cfg.icon || '🌿'}</span> ${cfg.title || zoneId} ${badge}</h2>${body}`;
}

function openModal(zoneId) {
  modalInner.innerHTML = buildModalHTML(zoneId);
  overlay.classList.add('open');
  isOpen = true;
  const cfg = STATIC_CONTENT[zoneId];
  if (cfg?.onOpen === 'loadReading')   loadReading();
  if (cfg?.onOpen === 'loadPlaylists') loadPlaylists();
  if (cfg?.onOpen === 'loadWriting')   loadWriting();
}

function closeModal() { overlay.classList.remove('open'); isOpen = false; }

// ─── Input ───
document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (e.key === 'Enter' && nearbyZone && !isOpen) openModal(nearbyZone);
  if (e.key === 'Escape') closeModal();
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
document.querySelectorAll('.zone').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.zone));
});
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

// ─── Fireflies ───
class Firefly {
  constructor() {
    this.x  = 5 + Math.random() * 88;
    this.y  = 10 + Math.random() * 78;
    this.vx = (Math.random() - 0.5) * 0.04;
    this.vy = (Math.random() - 0.5) * 0.03;
    this.ph = Math.random() * Math.PI * 2;
    this.el = document.createElement('div');
    this.el.className = 'firefly';
    world.appendChild(this.el);
  }
  update() {
    this.ph += 0.035;
    this.x  += this.vx + Math.sin(this.ph * 0.6) * 0.015;
    this.y  += this.vy + Math.cos(this.ph * 0.4) * 0.01;
    this.vx += (Math.random() - 0.5) * 0.0015;
    this.vy += (Math.random() - 0.5) * 0.001;
    this.vx  = Math.max(-0.05, Math.min(0.05, this.vx));
    this.vy  = Math.max(-0.04, Math.min(0.04, this.vy));
    if (this.x < 2) this.x = 96; if (this.x > 98) this.x = 4;
    if (this.y < 6) this.y = 88; if (this.y > 92) this.y = 8;
    const g = (Math.sin(this.ph) + 1) / 2;
    this.el.style.left    = this.x + '%';
    this.el.style.top     = this.y + '%';
    this.el.style.opacity = (0.15 + g * 0.85).toFixed(2);
    this.el.style.boxShadow = `0 0 ${(3 + g * 7).toFixed(1)}px ${(2 + g * 4).toFixed(1)}px rgba(140,255,70,${(g * 0.7).toFixed(2)})`;
  }
}
const fireflies = Array.from({ length: 16 }, () => new Firefly());

// ─── Game loop ───
function tick() {
  if (!isOpen) {
    vel.x = 0; vel.y = 0;
    if (keys['ArrowLeft']  || keys['a'] || keys['A']) vel.x = -SPEED;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) vel.x =  SPEED;
    if (keys['ArrowUp']    || keys['w'] || keys['W']) vel.y = -SPEED;
    if (keys['ArrowDown']  || keys['s'] || keys['S']) vel.y =  SPEED;
    if (vel.x && vel.y) { vel.x *= 0.707; vel.y *= 0.707; }

    pos.x = Math.max(2, Math.min(97, pos.x + vel.x));
    pos.y = Math.max(5, Math.min(90, pos.y + vel.y));

    const moving = vel.x !== 0 || vel.y !== 0;

    // Direction
    if (moving) {
      if (Math.abs(vel.x) >= Math.abs(vel.y)) {
        direction = vel.x > 0 ? 'right' : 'left';
      } else {
        direction = vel.y > 0 ? 'down' : 'up';
      }
      walkTimer++;
      if (walkTimer >= WALK_FPS) { walkFrame = (walkFrame + 1) % 2; walkTimer = 0; }
    } else {
      walkFrame = 0; walkTimer = 0;
    }

    // Apply direction to sprite
    const sprDir = direction === 'left' ? 'right' : direction;
    charSprite.className = `char-sprite dir-${sprDir}${moving ? ' walking' : ''}`;
    charFlip.className   = `char-flip${direction === 'left' ? ' facing-left' : ''}`;

    // Proximity
    let closest = null, closestDist = 8;
    ZONES.forEach(z => {
      const d = Math.hypot(pos.x - z.x, pos.y - z.y);
      if (d < closestDist) { closest = z.id; closestDist = d; }
    });
    if (closest !== nearbyZone) {
      if (nearbyZone) document.getElementById('zone-' + nearbyZone)?.classList.remove('nearby');
      nearbyZone = closest;
      if (nearbyZone) document.getElementById('zone-' + nearbyZone)?.classList.add('nearby');
    }
    if (nearbyZone) {
      const zEl = document.getElementById('zone-' + nearbyZone);
      if (zEl) {
        const r  = zEl.getBoundingClientRect();
        const wr = world.getBoundingClientRect();
        promptEl.style.left    = (r.left - wr.left + r.width / 2 - 54) + 'px';
        promptEl.style.top     = (r.top  - wr.top  - 28) + 'px';
        promptEl.style.display = 'block';
      }
    } else { promptEl.style.display = 'none'; }
  }

  charEl.style.left = pos.x + '%';
  charEl.style.top  = pos.y + '%';
  fireflies.forEach(f => f.update());
  requestAnimationFrame(tick);
}

fetchObsidianNotes();
tick();
