# 🚀 CÓMO TESTEAR EL FORMULARIO LOCALMENTE

## ⚠️ PROBLEMA
Formspree NO funciona si abres el archivo directamente (`file://`).
Necesitas un servidor local.

## ✅ SOLUCIÓN RÁPIDA (3 opciones)

### OPCIÓN 1: Python (Más Fácil)

1. Abre Terminal/CMD en la carpeta del sitio
2. Ejecuta UNO de estos comandos:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Abre en tu navegador: `http://localhost:8000`
4. ¡El formulario funcionará! ✅

---

### OPCIÓN 2: Node.js

1. Instala: `npm install -g http-server`
2. En la carpeta del sitio ejecuta: `http-server`
3. Abre: `http://localhost:8080`

---

### OPCIÓN 3: VS Code

1. Instala extensión: "Live Server"
2. Click derecho en `index.html`
3. "Open with Live Server"

---

## 🧪 TESTEAR

1. Inicia servidor local (cualquier opción)
2. Abre en navegador (http://localhost:XXXX)
3. Llena el formulario
4. Click "Request Free Audit"
5. Debería llegar email a info@faralai.com ✅

---

## 📤 SUBIR A PRODUCCIÓN

Para que funcione en producción, sube el sitio a:
- Netlify (gratis, arrastra la carpeta)
- Vercel (gratis)
- GitHub Pages (gratis)
- Tu hosting

¡Formspree funcionará automáticamente! 🚀
