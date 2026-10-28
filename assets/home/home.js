// Faralai · header state, scroll reveals, audit form and tracking.

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

document.documentElement.classList.add('js');

// Header gets a background once the page scrolls.
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Fade sections in as they enter the viewport.
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// Audit CTAs scroll to the form and focus its first field.
const form = document.getElementById('audit-form');
document.querySelectorAll('[data-audit]').forEach(el => {
  el.addEventListener('click', () => {
    track('open_audit', { location: el.dataset.audit });
    const first = form && form.querySelector('input:not([type="hidden"])');
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 600);
  });
});

// Audit form.
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
