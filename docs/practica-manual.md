---
sidebar_position: 4
title: "Práctica 1: Inyección manual"
---

# Práctica 1 · Inyección manual

Con DVWA preparada, se entra a la sección **SQL Injection** del menú. Aparece un campo que pide un **User ID**. Ahí se harán las pruebas, de la más simple a la más avanzada.

:::tip Consejo para que nunca falle
Conviene **copiar y pegar** cada comando en el campo "User ID" en lugar de escribirlo a mano. Un espacio o una comilla de más hacen que falle. Todos los comandos de abajo están en su versión más confiable.
:::

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

## Paso 3. Extraer datos del sistema

Con la inyección confirmada, se pueden pedir datos del propio sistema, como el usuario de la base de datos y el nombre de la base:

```
1' UNION SELECT user(), database() -- -
```

El resultado muestra el usuario de la base de datos y que la base se llama **dvwa**.

## Paso 4. Obtener usuarios y contraseñas

Finalmente se extraen los usuarios y contraseñas guardados en la tabla de ejemplo:

```
1' UNION SELECT user, password FROM users -- -
```

Las contraseñas aparecen convertidas en **hash MD5**, no en texto plano. Esto sirve para explicar que, aunque las contraseñas estén cifradas, el atacante igual puede verlas si la aplicación es vulnerable, y que por eso el cifrado no sustituye a una buena programación.

:::note Sobre el `-- -` del final
El `-- -` (guion, guion, espacio, guion) es un comentario de SQL que anula el resto de la consulta. Se usa `-- -` en lugar de solo `-- ` porque el navegador borra los espacios del final, y sin ese guion extra el comentario no funcionaría.
:::

## Resumen de la práctica

| Paso | Lo que se escribe | Lo que demuestra |
|------|-------------------|------------------|
| 1 | `1'` | El campo es vulnerable (da error). |
| 2 | `1' OR '1'='1` | Se devuelven todos los usuarios. |
| 3 | `1' UNION SELECT user(), database() -- -` | Se obtienen datos del sistema. |
| 4 | `1' UNION SELECT user, password FROM users -- -` | Se extraen usuarios y contraseñas. |
