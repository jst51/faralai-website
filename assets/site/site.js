// Faralai · scroll story, side navigation, audit modal and tracking.

// Meta Pixel: paste the Faralai pixel ID here once it exists in Events Manager.
const META_PIXEL_ID = '';

(function initPixel() {
  if (!META_PIXEL_ID) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
})();

function track(event, params) {
  if (window.gtag) gtag('event', event, params || {});
  if (window.fbq) {
    if (event === 'generate_lead') fbq('track', 'Lead', params || {});
    if (event === 'open_audit') fbq('track', 'ViewContent', { content_name: 'audit_form' });
  }
}

// Split statement text into words so each can be revealed by scroll position.
document.querySelectorAll('[data-words]').forEach(el => {
  const words = [];
  const walk = (node, wrapper) => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { wrapper.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span');
          s.className = 'w';
          s.textContent = part;
          wrapper.appendChild(s);
          words.push(s);
        });
      } else {
        const clone = child.cloneNode(false);
        wrapper.appendChild(clone);
        walk(child, clone);
      }
    });
  };
  const frag = document.createElement('span');
  walk(el, frag);
  el.replaceChildren(...frag.childNodes);
  words.forEach((w, i) => { w.style.setProperty('--wi', i); w.style.setProperty('--wn', words.length); });
});

// Scroll story: only on wide screens without reduced motion.
const storyQuery = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
const tracks = [...document.querySelectorAll('.track')];
let ticking = false;

function updateTracks() {
  ticking = false;
  const vh = window.innerHeight;
  tracks.forEach(t => {
    const r = t.getBoundingClientRect();
    const total = r.height - vh;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    t.style.setProperty('--p', p.toFixed(4));
  });
}
function onScroll() {
  if (!ticking) { ticking = true; requestAnimationFrame(updateTracks); }
}
function applyStory() {
  document.documentElement.classList.toggle('story', storyQuery.matches);
  updateTracks();
}
storyQuery.addEventListener('change', applyStory);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
applyStory();

// Side navigation: highlight the section in view.
const navLinks = [...document.querySelectorAll('.side-nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));
}

// Audit modal.
const modal = document.getElementById('audit-modal');
let lastFocus = null;
function openModal(source) {
  if (!modal || !modal.hidden) return;
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  const first = modal.querySelector('input:not([type="hidden"])');
  if (first) setTimeout(() => first.focus(), 50);
  track('open_audit', { location: source || 'link' });
}
function closeModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (location.hash === '#auditoria' || location.hash === '#audit') history.replaceState(null, '', location.pathname);
  if (lastFocus) lastFocus.focus();
}
document.querySelectorAll('[data-open-audit]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openModal(el.dataset.openAudit); });
});
if (modal) {
  modal.querySelector('.close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  if (location.hash === '#auditoria' || location.hash === '#audit') openModal('url');
}

// Audit form.
const form = document.getElementById('audit-form');
if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const msg = JSON.parse(form.dataset.messages);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    status.className = 'form-status';
    status.textContent = msg.sending;
    button.disabled = true;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      status.className = 'form-status ok';
      status.textContent = msg.ok;
      track('generate_lead', { form: 'audit', page: location.pathname });
      form.reset();
    } catch (err) {
      status.className = 'form-status err';
      status.textContent = msg.err;
    } finally {
      button.disabled = false;
    }
  });
}
