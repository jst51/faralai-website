/* ═══════════════════════════════════════════════
   FARALAI — main.js
   Cursor, scroll, animations, language switcher
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; }
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a,button,.btn,.service-card,.news-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
  });

  /* ── PROGRESS BAR ── */
  const bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    });
  }

  /* ── NAV ACTIVE + SHRINK ── */
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (nav) nav.style.background = window.scrollY > 60
      ? 'rgba(8,8,8,0.97)'
      : 'rgba(8,8,8,0.88)';

    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${cur}` || a.getAttribute('href') === `./${cur}.html`);
    });
  });

  /* ── MOBILE BURGER ── */
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
      burger.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
      burger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── LANGUAGE SWITCHER ── */
  const langBtns = document.querySelectorAll('.lang-switcher button');
  const translations = window.FARALAI_TRANSLATIONS || {};

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('faralai_lang', lang);
      applyTranslation(lang);
    });
  });

  function applyTranslation(lang) {
    if (!translations[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });
  }

  // Init language
  const savedLang = localStorage.getItem('faralai_lang') || 'en';
  const initBtn = document.querySelector(`.lang-switcher button[data-lang="${savedLang}"]`);
  if (initBtn) initBtn.classList.add('active');
  if (savedLang !== 'en') applyTranslation(savedLang);

  /* ── RSS NEWS FEED ── */
  async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    const feeds = [
      'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/sportspromedia',
      'https://api.rss2json.com/v1/api.json?rss_url=https://marketingweek.com/feed/',
    ];

    const fallbackNews = [
      { title: 'How AI is Reshaping Sports Marketing Strategy in 2026', source: 'Sports Business Journal', date: 'Mar 2026', excerpt: 'Artificial intelligence is fundamentally changing how sports organisations engage fans, attract sponsors and measure performance across all channels.', link: '#' },
      { title: 'The Rise of Agentic AI in Enterprise Business Intelligence', source: 'Harvard Business Review', date: 'Mar 2026', excerpt: 'Autonomous AI agents are moving from experimental pilots to core business infrastructure, transforming how companies analyse and act on data.', link: '#' },
      { title: 'Sponsorship Analytics: Data-Driven Partnerships Are the New Standard', source: 'SportsPro', date: 'Feb 2026', excerpt: 'Brands and rights holders are demanding measurable ROI from sponsorship deals, pushing the industry toward sophisticated data and analytics frameworks.', link: '#' },
      { title: 'Performance Marketing Evolution: AI-Powered Campaigns Outperform by 3x', source: 'Marketing Week', date: 'Feb 2026', excerpt: 'New research shows campaigns powered by converging AI and first-party data consistently outperform traditional performance marketing approaches.', link: '#' },
      { title: 'CRM in Sports: From Fan Data to Fan Intelligence', source: 'Forbes', date: 'Jan 2026', excerpt: 'Leading sports organisations are evolving CRM from simple databases into intelligence systems that predict behaviour and personalise every touchpoint.', link: '#' },
      { title: 'Communications in the AI Era: PR and Strategy Converge', source: 'PR Week', date: 'Jan 2026', excerpt: 'The boundaries between public relations, content strategy and AI-generated communications are dissolving, creating a new discipline entirely.', link: '#' },
    ];

    // Try to fetch live RSS
    let items = [];
    for (const feed of feeds) {
      try {
        const res = await fetch(feed);
        if (res.ok) {
          const data = await res.json();
          if (data.items) {
            items.push(...data.items.slice(0, 3).map(item => ({
              title: item.title,
              source: data.feed?.title || 'News',
              date: new Date(item.pubDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
              excerpt: item.description?.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
              link: item.link
            })));
          }
        }
      } catch(e) { /* fallback */ }
    }

    const newsToShow = items.length >= 3 ? items.slice(0, 6) : fallbackNews;
    container.innerHTML = newsToShow.map(n => `
      <article class="news-card reveal" onclick="window.open('${n.link}','_blank')">
        <div class="news-meta">
          <span class="news-source">${n.source}</span>
          <span class="news-date">${n.date}</span>
        </div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-excerpt">${n.excerpt}</p>
        <span class="news-link">Read more →</span>
      </article>
    `).join('');

    // Re-observe new elements
    container.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  }

  loadNews();

  /* ── CONTACT FORM ── */
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '✓ Message sent';
        btn.style.borderColor = '#CCFF00';
        btn.style.color = '#CCFF00';
        form.reset();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style = ''; }, 3000);
      }, 1200);
    });
  }

  /* ── CONVERGENCE CANVAS ANIMATION ── */
  const canvas = document.getElementById('convergence-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, lines = [], animFrame;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cx = W / 2; cy = H / 2;
      buildLines();
    }

    function buildLines() {
      lines = [];
      const count = 14;
      for (let i = 0; i < count; i++) {
        const frac = i / (count - 1);
        const side = i % 2 === 0 ? 'left' : 'right';
        lines.push({
          sx: side === 'left' ? 0 : W,
          sy: H * (0.05 + frac * 0.9),
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.003,
          alpha: 0.15 + Math.random() * 0.35,
          side,
          color: side === 'left' ? [204,255,0] : [123,111,240]
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      lines.forEach(l => {
        l.progress += l.speed;
        if (l.progress > 1) l.progress = 0;
        const px = l.sx + (cx - l.sx) * l.progress;
        const py = l.sy + (cy - l.sy) * l.progress;
        const [r,g,b] = l.color;
        const grad = ctx.createLinearGradient(l.sx, l.sy, cx, cy);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(l.progress, `rgba(${r},${g},${b},${l.alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.moveTo(l.sx, l.sy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      // Center node
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#CCFF00';
      ctx.fill();
      // Rings
      [20, 40].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(204,255,0,${0.15 - i*0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      animFrame = requestAnimationFrame(drawFrame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    drawFrame();
  }

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => {
    el.dataset.target = el.textContent;
    counterObs.observe(el);
  });

});
