# Manual SQL Injection — sitio Docusaurus

Manual de la práctica guiada de SQL Injection, hecho con Docusaurus.
Autor: Bresler Avizaí Morales Gamez · UMG, Sede Salamá.

## Requisitos

- **Node.js 18 o superior** instalado. Para comprobarlo: `node --version`.
  Si no lo tienes, descárgalo de https://nodejs.org (versión LTS).

## Cómo verlo en tu computadora

Abre una terminal **dentro de esta carpeta** (`manual-sqli`) y ejecuta:

```bash
# 1. Instalar lo necesario (solo la primera vez, tarda uno o dos minutos)
npm install

# 2. Levantar el sitio
npm start
```

El sitio se abre solo en el navegador en **http://localhost:3000**.
Para detenerlo, presiona `Ctrl + C` en la terminal.

## Dónde está el contenido

- Las páginas del manual están en la carpeta **`docs/`** (son archivos `.md`).
- El orden del menú se define en **`sidebars.js`**.
- El título, colores y configuración general están en **`docusaurus.config.js`**.

## Para publicarlo en internet (opcional)

```bash
npm run build
```

Esto genera una carpeta `build/` con el sitio listo para subir a GitHub Pages,
Netlify o Vercel de forma gratuita.
