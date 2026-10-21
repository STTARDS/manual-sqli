---
sidebar_position: 1
title: Introducción
---

# ¿Qué es SQL Injection?

> **Curso:** Ingeniería en Sistemas · Ethical Hacking / Seguridad
> **Herramientas:** Kali Linux · DVWA · sqlmap
> **Valor:** 5 pts. · **Tiempo de exposición:** 10 minutos

:::warning Aviso ético y legal (leer antes de empezar)
Todo lo que se muestra aquí se hace **únicamente sobre un laboratorio propio y de prueba** (una aplicación hecha a propósito con fallos para aprender). Se recomienda **nunca** aplicar estas técnicas sobre sitios o sistemas reales sin autorización escrita del dueño, ya que en Guatemala y en la mayoría de países esto constituye un delito. El objetivo es **entender cómo funciona el ataque para poder defenderse de él**.
:::

## La idea en una frase

Se define **SQL Injection (SQLi)** como una vulnerabilidad que permite a un atacante **"colar" sus propias órdenes SQL** dentro de las consultas que una aplicación le hace a su base de datos.

## ¿Por qué ocurre? (explicado fácil)

Imagina un formulario de inicio de sesión. Por dentro, la aplicación arma una pregunta a la base de datos más o menos así:

```sql
SELECT * FROM usuarios WHERE usuario = 'LO_QUE_ESCRIBE_EL_USUARIO' AND clave = 'LA_CLAVE';
```

El problema aparece cuando la aplicación **pega directamente** lo que escribe el usuario, sin revisarlo. Si en lugar de un nombre normal el atacante escribe símbolos de SQL, esos símbolos **se mezclan con la orden** y cambian su significado.

Es como si en una carta alguien pudiera escribir texto que el cartero confunde con instrucciones: en vez de leerse como "el usuario se llama X", la base de datos termina obedeciendo una orden nueva.

## Los tipos principales

| Tipo | En palabras sencillas |
|------|------------------------|
| **In-band (clásica)** | El resultado del ataque se ve directo en la pantalla (la más fácil de entender). |
| **Blind (a ciegas)** | La página no muestra el dato, pero el atacante lo adivina viendo cómo se comporta (si responde "sí/no" o si tarda más). |
| **Out-of-band** | Usa canales alternos (peticiones de red). Es la menos común. |

## ¿Qué sigue en este manual?

1. **[El payload explicado](./payload-explicado.md)** → qué significa cada símbolo de `' OR '1'='1' --`.
2. **[Montar el laboratorio](./laboratorio.md)** → Kali Linux + DVWA.
3. **[Práctica manual](./practica-manual.md)** y **[sqlmap](./sqlmap.md)** → la demostración real del ataque.
4. **[Defensas](./defensas.md)** → cómo se previene (lo más importante).
