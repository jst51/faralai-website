# faralai.com (React)

The new Faralai site: Next.js + React + TypeScript, Tailwind CSS, Motion, Lenis and React Three Fiber.
It exports to plain static files, so it runs on any web host.

## Work on it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 (Spanish) and http://localhost:3000/en/ (English).

## Publish it

```bash
npm run build
```

This creates the `out/` folder. Upload everything inside `out/` to the root of your hosting
(usually `public_html/` or `www/`) and point faralai.com at it.

## Where things live

- All text, in Spanish and English: `src/content/dictionary.ts`
- Page layout and sections: `src/components/Home.tsx`
- Colours, fonts and tile styles: `src/app/globals.css`
- Interactive playbook: `src/components/Playbook.tsx`
- Live clocks: `src/components/Clocks.tsx`
- WebGL logo: `src/components/GrowthLines.tsx`
- Audit form (sends to Formspree, same inbox as before): `src/components/AuditForm.tsx`
- SEO, fonts and Google Analytics: `src/lib/site.tsx`
- Images: `public/images/`
