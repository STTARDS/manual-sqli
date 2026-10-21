---
slug: /
sidebar_position: 1
title: Introducción
---

# Práctica Guiada: SQL Injection

> **Curso:** Ethical Hacking / Seguridad
> **Herramientas:** Kali Linux · DVWA · sqlmap
> **Tiempo de exposición estimado:** 10 minutos · **Valor:** 5 pts.

:::warning Aviso ético y legal (leer antes de empezar)
Todo lo que se muestra en esta práctica se realiza **únicamente sobre un laboratorio propio y de prueba** (una aplicación hecha a propósito con fallos para aprender). Se recomienda **nunca** aplicar estas técnicas sobre sitios o sistemas reales sin autorización escrita del dueño, ya que en Guatemala y en la mayoría de países esto constituye un delito. El objetivo de la práctica es **entender cómo funciona el ataque para poder defenderse de él**.
:::

## ¿Qué es SQL Injection?

Se define **SQL Injection (SQLi)** como una vulnerabilidad que permite a un atacante insertar o "inyectar" código SQL malicioso dentro de las consultas que una aplicación le envía a su base de datos.

El problema aparece cuando la aplicación arma sus consultas **pegando directamente** lo que escribe el usuario, sin validarlo ni separarlo del código. Por ejemplo, una consulta de inicio de sesión mal hecha:

```sql
SELECT * FROM usuarios WHERE usuario = '[entrada]' AND clave = '[clave]';
```

Si en el campo usuario se escribe `' OR '1'='1' -- `, la consulta se transforma en algo que **siempre resulta verdadero**, y así se puede saltar el inicio de sesión sin saber la contraseña.

## Tipos principales

| Tipo | Descripción |
|------|-------------|
| **In-band (clásica)** | Los resultados se ven directamente en la página (UNION-based, error-based). |
| **Blind (a ciegas)** | La página no muestra el dato, pero se deduce por su comportamiento (respuestas verdadero/falso o por tiempos de demora). |
| **Out-of-band** | Se usan canales alternos (peticiones DNS/HTTP). Es la menos común. |

En las siguientes páginas se monta el laboratorio y se demuestra la vulnerabilidad paso a paso.
