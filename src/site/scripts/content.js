const CONFIG = {
  obsidian: { enabled: true, tagMap: { 'deep-dives':'deep-dives','curiosities':'curiosities','projects':'projects','updates':'updates','writing':'writing','identity':'identity','career':'career','mind':'mind','health':'health','productivity':'productivity','climate':'climate','finance':'finance','technology':'technology','creative':'creative','relationships':'relationships','spirituality':'spirituality','book-notes':'book-notes','mait-isms':'mait-isms' } },
  openLibrary: { username: '', enabled: false },
  substack:    { url: '', enabled: false },
  spotify:     { playlists: [], enabled: false },
  writing:     { medium: '', substack: '', linkedin: 'https://linkedin.com/in/maitreyi-menon' },
  contact:     { email: 'hello@maitreyi.garden', linkedin: 'https://linkedin.com/in/maitreyi-menon', twitter: '', substack: '' },
};

const STATIC_CONTENT = {

  about: {
    icon: '🌿', title: 'About Me',
    html: `<p>Hey — I'm Mait. Building a career at the intersection of <strong>capital markets, climate technology, and global development</strong>.</p>
      <p>Fellow at Columbia CGEP &amp; CKI. Co-founder of <strong>CleanCrop</strong> — methane reduction / carbon credits. Based in New York.</p>
      <p>This garden is my thinking made public. Wander around — everything you find is something I'm actually growing.</p>
      <div class="contact-row">
        <a class="contact-btn" href="${CONFIG.contact.linkedin}" target="_blank">LinkedIn</a>
        <a class="contact-btn" href="mailto:${CONFIG.contact.email}">Email</a>
      </div>`
  },

  identity: {
    icon: '🏡', title: 'Identity',
    obsidianTag: 'identity',
    fallback: `<p>Who I am, what I value, how I operate.</p>
      <div class="note-card"><h3>Values (Schwartz Profile)</h3><p>Self-direction, Stimulation, Security — in that order. The tension between wanting novelty and needing stability is the central friction of my life.</p></div>
      <div class="note-card"><h3>Constitution</h3><p>My rules for living. Not aspirational — descriptive of how I actually want to operate.</p></div>
      <div class="note-card"><h3>Philosophy</h3><p>Working theories about existence, meaning, and what makes a life worth living.</p></div>`
  },

  'mait-isms': {
    icon: '📜', title: 'Mait-isms',
    obsidianTag: 'mait-isms',
    fallback: `<p>One-liners I've written that I actually believe. The distilled stuff.</p>
      <div class="note-card"><h3>On Time</h3><p>"Being early is the only form of control you have."</p></div>
      <div class="note-card"><h3>On Career</h3><p>"Your career is not a ladder. It's a garden. You have to tend it, not climb it."</p></div>
      <div class="note-card"><h3>On People</h3><p>"The most interesting people are the ones who don't need to be interesting."</p></div>`
  },

  writing: {
    icon: '✍️', title: 'Writing',
    obsidianTag: 'writing',
    fallback: `<p>Essays, threads, dispatches — thinking made permanent.</p>`,
    html: `<p>Essays, threads, dispatches — thinking made permanent.</p>
      <div id="writing-feed"><div class="loading-dots">loading ···</div></div>
      <div class="contact-row" style="margin-top:12px;">
        ${CONFIG.writing.substack ? `<a class="contact-btn" href="${CONFIG.writing.substack}" target="_blank">Substack</a>` : ''}
        <a class="contact-btn" href="${CONFIG.writing.linkedin}" target="_blank">LinkedIn</a>
      </div>`,
    onOpen: 'loadWriting'
  },

  career: {
    icon: '💼', title: 'Career',
    obsidianTag: 'career',
    fallback: `<p>How I think about work, jobs, and building something over time.</p>
      <div class="note-card"><h3>Career Rules</h3><p>The principles I actually follow: treat the job search like a research project, networking is curiosity with follow-through, never optimize for salary in your 20s.</p></div>
      <div class="note-card"><h3>Interview Masterclass</h3><p>Frameworks, scripts, and question bank. What I've learned from 50+ interviews.</p></div>
      <div class="note-card"><h3>Outreach Templates</h3><p>Cold email and LinkedIn templates that actually work. Specific knowledge + research thread + unconventional-as-asset framing.</p></div>`
  },

  mind: {
    icon: '🔭', title: 'Mind',
    obsidianTag: 'mind',
    fallback: `<p>How thinking works, how to think better, and the models I use.</p>
      <div class="note-card"><h3>ADHD Voltage Model</h3><p>ADHD as a voltage regulation problem — not a deficit. Managing the spikes, crashes, and environment design that makes both work.</p><span class="modal-tag">adhd</span></div>
      <div class="note-card"><h3>Mental Models</h3><p>Pre-mortem, inversion, Chesterton's fence, surface area for luck. The tools I actually use.</p></div>
      <div class="note-card"><h3>Procrastination</h3><p>Why it happens (hint: not laziness) and the only interventions that work for my brain.</p></div>`
  },

  health: {
    icon: '🌱', title: 'Health',
    obsidianTag: 'health',
    fallback: `<p>Sleep, movement, food, supplements. What my body actually needs.</p>
      <div class="note-card"><h3>Bedrock Protocol</h3><p>The non-negotiables: sleep ≥7h, morning light, no caffeine after 1pm, protein at every meal. Everything else is optimization.</p></div>
      <div class="note-card"><h3>Nervous System</h3><p>How to regulate a dysregulated nervous system. ADHD, stress, and the somatic tools that help.</p></div>`
  },

  productivity: {
    icon: '⚙️', title: 'Productivity',
    obsidianTag: 'productivity',
    fallback: `<p>Systems that work, systems that don't, and why most productivity advice is for the wrong brain type.</p>
      <div class="note-card"><h3>GTD Adaptation</h3><p>How I've adapted Getting Things Done for an ADHD brain. Capture everything, process weekly, trust nothing you don't write down.</p></div>
      <div class="note-card"><h3>Morning Routine</h3><p>The exact sequence that sets me up. Tight window, no decisions, coffee after sunlight.</p></div>`
  },

  'book-notes': {
    icon: '📚', title: 'Book Notes',
    obsidianTag: 'book-notes',
    fallback: `<p>What I actually took from what I read.</p>
      <div class="note-card"><h3>Essentialism — Greg McKeown</h3><p>The disciplined pursuit of less. The core insight: saying yes to everything is saying no to what actually matters.</p></div>
      <div class="note-card"><h3>The Tao of Physics — Capra</h3><p>Quantum field theory and Eastern mysticism describing the same thing from different directions. Still wild.</p></div>
      <div class="note-card"><h3>48 Laws of Power — Greene</h3><p>A field guide to how power actually moves. Read as anthropology, not instruction.</p></div>`
  },

  climate: {
    icon: '🌬️', title: 'Climate & Energy',
    obsidianTag: 'climate',
    fallback: `<p>The sector I'm building in. What I know, what I'm learning.</p>
      <div class="note-card"><h3>Blended Finance</h3><p>How catalytic capital works: using concessional money to de-risk commercial investment in hard-to-finance climate solutions.</p><span class="modal-tag">impact</span></div>
      <div class="note-card"><h3>Carbon Markets</h3><p>The mechanics of Voluntary Carbon Markets — how credits are generated, verified, priced, and retired. Also: where they break.</p></div>
      <div class="note-card"><h3>CleanCrop</h3><p>Methane reduction in agriculture. The science, the market structure, the financing model.</p><span class="modal-tag">my project</span></div>`
  },

  finance: {
    icon: '💰', title: 'Finance',
    obsidianTag: 'finance',
    fallback: `<p>Capital markets, financial modelling, impact investing.</p>
      <div class="note-card"><h3>Financial Modelling</h3><p>How to build models that actually tell you something. Climate finance models are different from traditional DCF — the uncertainty ranges are enormous.</p></div>
      <div class="note-card"><h3>Impact Investing</h3><p>What impact investing actually is (and isn't). The spectrum from ESG screening to catalytic capital to DFI mandates.</p></div>`
  },

  technology: {
    icon: '🖥️', title: 'Technology',
    obsidianTag: 'technology',
    fallback: `<p>AI, tools, automation, and how technology actually changes things.</p>
      <div class="note-card"><h3>AI in Climate Finance</h3><p>Where AI is actually useful (satellite data, MRV, deal sourcing) vs where it's hype (replacing judgement in complex negotiations).</p></div>
      <div class="note-card"><h3>Tools I Use</h3><p>My actual stack: Obsidian, Claude, Notion, Python for modelling. The tool matters less than the workflow.</p></div>`
  },

  creative: {
    icon: '🎨', title: 'Creative',
    obsidianTag: 'creative',
    fallback: `<p>Ideas, projects, things I want to make.</p>
      <div class="note-card"><h3>BCN App</h3><p>A tool for making financial modelling accessible to non-finance people working in impact. Spec in progress.</p><span class="modal-tag">in progress</span></div>
      <div class="note-card"><h3>This Garden</h3><p>A pixel-art digital garden that lives syncs with my Obsidian vault. You're in it right now.</p><span class="modal-tag">active</span></div>`
  },

  relationships: {
    icon: '💕', title: 'Relationships',
    obsidianTag: 'relationships',
    fallback: `<p>How I think about people, connection, and the relationships worth building.</p>
      <div class="note-card"><h3>Relationship Principles</h3><p>The non-negotiables. Consistency over intensity. Show up when it's inconvenient. Don't keep score.</p></div>
      <div class="note-card"><h3>Dating Philosophy</h3><p>What I'm actually looking for and why I've stopped treating it like a project to optimize.</p></div>`
  },

  spirituality: {
    icon: '⛩️', title: 'Spirituality',
    obsidianTag: 'spirituality',
    fallback: `<p>Meaning, practice, and the things that make me feel connected to something larger.</p>
      <div class="note-card"><h3>Practices</h3><p>What I actually do: journalling, movement as meditation, long walks without headphones. Nothing elaborate.</p></div>
      <div class="note-card"><h3>Tao of Physics</h3><p>The convergence of quantum physics and Eastern mysticism. The book that cracked something open in me.</p></div>`
  },

  reading: {
    icon: '📖', title: 'Reading',
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
    fallback: `<p>What I'm up to — Q2 2026.</p>
      <ul>
        <li>Job search: Impact VC, ESG, blended finance, DFI roles</li>
        <li>Financial modelling: climate &amp; impact finance models</li>
        <li>CleanCrop: methane reduction / carbon credit development</li>
        <li>Writing: impact finance thought leadership</li>
        <li>Growing this garden</li>
      </ul>
      <p style="font-size:16px;color:#7a6040;margin-top:8px;">Last updated June 2026</p>`
  },

  stay: {
    icon: '❤️', title: 'Stay in Touch',
    html: `<p>I like interesting people. If something here resonated — say hi.</p>
      <div class="contact-row">
        <a class="contact-btn" href="mailto:${CONFIG.contact.email}">✉ Email</a>
        <a class="contact-btn" href="${CONFIG.contact.linkedin}" target="_blank">LinkedIn</a>
        ${CONFIG.contact.twitter ? `<a class="contact-btn" href="${CONFIG.contact.twitter}" target="_blank">X</a>` : ''}
        ${CONFIG.contact.substack ? `<a class="contact-btn" href="${CONFIG.contact.substack}" target="_blank">Substack</a>` : ''}
      </div>
      <p style="margin-top:16px;">Best for: climate finance, blended finance, impact VC, ADHD, or why capital markets are broken in interesting ways.</p>`
  },
};
