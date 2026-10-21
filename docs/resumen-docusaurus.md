---
sidebar_position: 8
title: Resumen de la herramienta (Docusaurus)
---

# Resumen de la herramienta: Docusaurus

Esta página cumple con la parte de la tarea que pide un **resumen de la herramienta** usada para documentar.

## ¿Qué es Docusaurus?

Se describe **Docusaurus** como un generador de sitios de documentación de código abierto, creado por Meta (Facebook). Toma archivos escritos en **Markdown** (texto simple con formato) y los convierte automáticamente en un **sitio web** ordenado, con menú lateral, buscador y modo claro/oscuro, sin necesidad de saber diseño web.

## ¿Por qué se eligió?

Se identifica que, frente a otras opciones como SONAT o GitBook, Docusaurus ofrece ventajas para un estudiante:

- Es **gratuito** y de código abierto.
- Usa **Markdown**, que es muy fácil de aprender.
- Genera un sitio que se puede **mostrar en vivo** durante la exposición.
- Permite publicarlo gratis en internet (por ejemplo con GitHub Pages).

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

Al correr `npm start`, el sitio se abre en **http://localhost:3000**.

## ¿Cómo se agrega contenido?

Cada página del manual es un archivo `.md` dentro de la carpeta **`docs/`**. Al inicio de cada archivo se coloca un pequeño bloque llamado *front matter* que define su título y su posición en el menú:

```markdown
---
sidebar_position: 1
title: Introducción
---

# Mi contenido aquí
```

El orden de las páginas se controla desde el archivo **`sidebars.js`**.

## Resumen rápido

Se concluye que Docusaurus es una herramienta adecuada para documentar prácticas técnicas, porque separa el **contenido** (lo que uno escribe en Markdown) de la **presentación** (el diseño del sitio, que ya viene hecho).

---

## 📋 Guion sugerido para la exposición (10 min)

| Minutos | Qué decir / mostrar |
|---------|---------------------|
| 0–2 | Explicar qué es SQLi y el ejemplo `' OR '1'='1' -- ` (símbolo por símbolo, con la página "El payload explicado"). |
| 2–3 | Mostrar el laboratorio DVWA ya montado en Kali Linux. |
| 3–6 | Demostración **real** en DVWA (pasos manuales 1 a 3). |
| 6–8 | Demostración con **sqlmap**. |
| 8–10 | Defensas, conclusión y mostrar que todo el manual está hecho en **Docusaurus** y publicado en internet. |
