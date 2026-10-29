---
sidebar_position: 2
title: "Módulo 2: El payload explicado"
---

# Módulo 2 · ¿Qué significa `' OR '1'='1' --`?

Este es el ejemplo más famoso de SQL Injection. A continuación se explica símbolo por símbolo para entender por qué funciona.

## La consulta original

Para comprobar el usuario y la contraseña, la aplicación arma esta consulta:

```sql
SELECT * FROM usuarios WHERE usuario = '____' AND clave = '____';
```

En los espacios `____` se coloca lo que escribe la persona. Si todo es normal, se escribe un usuario y su clave, y la consulta funciona correctamente.

## La consulta después del ataque

Si en el campo **usuario** se escribe `' OR '1'='1' -- `, la consulta se convierte en:

```sql
SELECT * FROM usuarios WHERE usuario = '' OR '1'='1' -- ' AND clave = '____';
```

Cada parte del texto cumple una función:

| Símbolo | Qué hace |
|---------|----------|
| `'` | Cierra la comilla que la aplicación había abierto. Con esto el atacante sale del texto normal y empieza a escribir órdenes SQL reales. |
| `OR` | Agrega una segunda condición. En SQL, `OR` significa que basta con que se cumpla una de las dos para que el resultado sea verdadero. |
| `'1'='1'` | Una condición que siempre es verdadera, porque 1 siempre es igual a 1. Al ir unida con `OR`, vuelve verdadera toda la consulta. |
| `-- ` | Es el símbolo de comentario en SQL. Todo lo que viene después se ignora, así que la comprobación de la contraseña desaparece. |

## El resultado

La condición completa termina diciendo:

> "Dame los usuarios donde el nombre esté vacío **o donde 1 sea igual a 1**."

Como 1 siempre es igual a 1, la base de datos responde con usuarios válidos, y la parte que revisaba la contraseña quedó anulada por el comentario `--`. El resultado es que se obtiene acceso sin conocer la contraseña.

## Otras variantes

Existen muchas formas de lograr lo mismo:

```sql
admin' --            Entra directamente como el usuario "admin".
' OR 1=1 #           Igual que el clásico, usando # como comentario (MySQL).
' OR 'a'='a          Cualquier condición siempre verdadera también sirve.
```

Todas estas se ponen a prueba en la sección **Práctica paso a paso**.
