# faralai-website

**Faralai — Converging Intelligence**
Production website for [faralai.com](https://faralai.com)

## File Structure

```
faralai-website/
├── index.html          ← Homepage
├── about.html          ← About page
├── services.html       ← All 6 services
├── contact.html        ← Contact form
├── CNAME               ← Custom domain (faralai.com)
├── robots.txt          ← SEO crawl rules
├── sitemap.xml         ← SEO sitemap
└── assets/
    ├── css/
    │   └── style.css   ← Global stylesheet
    ├── js/
    │   ├── main.js          ← Cursor, scroll, animations, RSS, forms
    │   └── translations.js  ← EN / ES / FR strings
    └── img/
        └── favicon.svg ← SVG favicon
```

## Deploy to GitHub Pages

1. Push all files to the `main` branch of this repo
2. Go to **Settings → Pages → Source**: Deploy from `main / (root)`
3. Custom domain is already set via `CNAME` file
4. Enable **Enforce HTTPS** once DNS propagates

## Features

- Dark Predator brand: `#080808` black, `#CCFF00` lime, `#7B6FF0` purple
- Animated convergence canvas on hero
- Trilingual: EN / ES / FR (localStorage persistence)
- Live RSS news feed with fallback
- SEO + GEO optimized (Schema.org JSON-LD, sitemap, robots.txt)
- Scroll reveal animations
- Custom cursor
- Mobile responsive
- Contact form (Formspree)

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io).
Update the form action in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Create a free account at formspree.io and replace `YOUR_FORM_ID`.

---
© 2026 Faralai. Converging Intelligence —›‹—
