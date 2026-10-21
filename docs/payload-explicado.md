---
sidebar_position: 3
title: El payload explicado
---

# ¿Qué significa `' OR '1'='1' --`?

Este es **el ejemplo más famoso** de SQL Injection. Aquí se explica símbolo por símbolo, para que lo puedas contar con tus palabras en la exposición.

## Punto de partida: la consulta original

La aplicación quiere comprobar el usuario y la contraseña. Por dentro arma esto:

```sql
SELECT * FROM usuarios WHERE usuario = '____' AND clave = '____';
```

En los espacios `____` se pega lo que escribe la persona. Si todo es normal, el usuario escribe `admin` y su clave, y la consulta queda sana.

## ¿Qué pasa al escribir el ataque?

Si en el campo **usuario** se escribe `' OR '1'='1' -- `, la consulta se convierte en:

```sql
SELECT * FROM usuarios WHERE usuario = '' OR '1'='1' -- ' AND clave = '____';
```

Fíjate cómo cada parte del ataque cumple una función:

| Símbolo | ¿Qué hace? |
|---------|------------|
| `'` | **Cierra** la comilla que la aplicación había abierto. Con esto el atacante "sale" del texto y empieza a escribir **órdenes SQL de verdad**. |
| `OR` | Agrega una **segunda condición**. En SQL, `OR` significa "o se cumple una, o se cumple la otra". |
| `'1'='1'` | Una condición que **siempre es verdadera** (1 siempre es igual a 1). Como va con `OR`, hace que **toda la consulta sea verdadera**. |
| `-- ` | Es el símbolo de **comentario** en SQL. Todo lo que viene después se **ignora**. Así se "borra" la parte que revisaba la contraseña. |

## El resultado

La condición completa queda como:

> "Dame los usuarios donde el nombre sea vacío **O donde 1 sea igual a 1**"

Como `1 = 1` **siempre** se cumple, la base de datos responde con usuarios válidos, y **la comprobación de la contraseña desapareció** por el comentario `--`. Resultado: se entra **sin saber la contraseña**. 🔓

:::tip Frase para la exposición
"El truco está en que la comilla rompe la consulta, el `OR '1'='1'` la vuelve siempre verdadera, y los dos guiones `--` borran la parte de la contraseña."
:::

## Otras variantes que verás

```sql
admin' --            → entra directamente como el usuario "admin"
' OR 1=1 #           → igual que el clásico, pero con # como comentario (MySQL)
' OR 'a'='a          → cualquier condición siempre verdadera sirve
```

👉 Todas estas se prueban de verdad en la **[Práctica manual](./practica-manual.md)** dentro de DVWA.
