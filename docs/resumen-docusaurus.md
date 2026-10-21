---
sidebar_position: 7
title: Resumen de la herramienta (Docusaurus)
---

# Resumen de la herramienta: Docusaurus

Este manual fue construido con **Docusaurus**, por lo que esta sección explica qué es y por qué se eligió.

## ¿Qué es Docusaurus?

Docusaurus es un generador de sitios de documentación de código abierto, creado por Meta. Toma archivos escritos en **Markdown** (un formato de texto simple) y los convierte automáticamente en un sitio web ordenado, con menú lateral, buscador y modo claro/oscuro, sin necesidad de saber diseño web.

## ¿Por qué se eligió?

Frente a otras opciones como SONAT o GitBook, Docusaurus ofrece varias ventajas:

- Es gratuito y de código abierto.
- Usa Markdown, que es fácil de aprender.
- Genera un sitio que se puede mostrar en vivo y también publicar en internet de forma gratuita.
- Separa el contenido del diseño: uno se concentra en escribir, y la presentación ya viene resuelta.

## Comandos básicos

```bash
# Crear un proyecto nuevo (solo la primera vez)
npx create-docusaurus@latest manual-sqli classic

# Entrar a la carpeta del proyecto
cd manual-sqli

# Instalar lo que necesita (solo la primera vez)
npm install

# Levantar el sitio en la computadora para verlo
npm start
```

Al ejecutar `npm start`, el sitio se abre en `http://localhost:3000`.

## ¿Cómo se agrega contenido?

Cada página es un archivo `.md` dentro de la carpeta **docs/**. Al inicio de cada archivo se coloca un pequeño bloque que define su título y su posición en el menú:

```markdown
---
sidebar_position: 1
title: Introducción
---

# Contenido de la página
```

El orden de las páginas se controla desde el archivo **sidebars.js**.

## Publicación

El sitio se publicó en internet con **GitHub Pages**, un servicio gratuito de GitHub. De esta forma, el manual queda disponible en una dirección pública que cualquier persona puede abrir desde cualquier dispositivo, sin instalar nada.
