# Faralai Website

## 📁 Estructura de archivos

```
faralai-github/
├── index.html          ← Archivo principal de la web
├── assets/
│   ├── nba.webp
│   ├── uefa.jpeg
│   ├── f1.png
│   ├── bridgestone.jpg
│   ├── ford.png
│   ├── jaguar.webp
│   ├── vml.png
│   ├── burson.jpeg
│   ├── ogilvy.png
│   ├── ddb.jpg
│   ├── lesroches.jpeg
│   ├── novamex.png
│   ├── jose-manzanedo.jpg
│   └── [banners redes sociales]
```

## 🚀 Despliegue en GitHub Pages

1. Ve a tu repositorio de GitHub (faralai.com)
2. Sube todos los archivos de esta carpeta
3. Asegúrate de que la estructura sea:
   - `index.html` en la raíz
   - Carpeta `assets/` con todas las imágenes

## 📱 Assets para Redes Sociales

| Plataforma | Archivo | Tamaño |
|------------|---------|--------|
| LinkedIn Banner | `faralai-linkedin-banner.jpg` | 1584×396 |
| Facebook Cover | `faralai-facebook-cover.jpg` | 820×312 |
| Twitter/X Header | `faralai-twitter-header.jpg` | 1500×500 |
| Instagram Profile | `faralai-instagram-profile.png` | 320×320 |
| Instagram Story | `faralai-instagram-story.jpg` | 1080×1920 |
| OG Image | `faralai-og-banner.jpg` | 1200×630 |
| Icon Only | `faralai-icon.png` | 500×500 |

## 🔧 Google Tag Manager

Cuando quieras añadir GTM, inserta este código en el `<head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KKG3G933');</script>
<!-- End Google Tag Manager -->
```

Y después de `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKG3G933"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## ✅ Características

- ✓ Diseño responsive (móvil optimizado)
- ✓ Carrusel de logos animado
- ✓ Bilingüe EN/ES con detección automática
- ✓ Lead magnet form
- ✓ Partículas interactivas
- ✓ Custom cursor (desktop)
- ✓ SEO optimizado
- ✓ Schema.org structured data
- ✓ 6 servicios
- ✓ 3 paquetes de precios
