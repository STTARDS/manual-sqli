---
sidebar_position: 1
title: "Módulo 1: Introducción"
---

# Módulo 1 · ¿Qué es SQL Injection?

SQL Injection (inyección SQL) es una de las vulnerabilidades más conocidas en las páginas web. Permite que un atacante introduzca sus propias órdenes dentro de las consultas que una aplicación le hace a su base de datos, y de esa forma lea, modifique o robe información que no debería estar a su alcance.

## Cómo funciona, con un ejemplo cotidiano

Una página web guarda su información (usuarios, contraseñas, productos, etc.) en una **base de datos**. Para consultarla usa un lenguaje llamado **SQL**.

Cuando una persona inicia sesión, la página arma una consulta parecida a esta:

```sql
SELECT * FROM usuarios WHERE usuario = 'lo_que_escribio' AND clave = 'su_clave';
```

El riesgo aparece cuando la página **pega directamente** lo que escribió la persona dentro de la consulta, sin revisarlo. Si alguien, en lugar de un nombre normal, escribe símbolos propios de SQL, esos símbolos se mezclan con la orden y cambian su significado.

Dicho de otra forma: el atacante logra que la página le pregunte **otra cosa** a la base de datos. Por ejemplo, en vez de preguntar "¿existe este usuario con esta contraseña?", termina preguntando "¿existe cualquier usuario?", lo que le permite entrar sin conocer la contraseña.

## Un vistazo al ataque más común

El ejemplo clásico es escribir esto en el campo de usuario:

```
' OR '1'='1' -- 
```

Con eso, la consulta se vuelve siempre verdadera y la página concede el acceso aunque la contraseña sea incorrecta. En la sección **El payload explicado** se analiza qué hace cada símbolo.

## Tipos de inyección SQL

Existen tres formas principales:

| Tipo | En qué consiste |
|------|-----------------|
| **In-band (clásica)** | El resultado del ataque se ve directamente en la pantalla. Es la más sencilla de entender. |
| **Blind (a ciegas)** | La página no muestra el dato, pero el atacante lo deduce observando cómo responde (por ejemplo, si tarda más o si cambia su comportamiento). |
| **Out-of-band** | El atacante recibe la información por canales distintos, como peticiones de red. Es la menos frecuente. |

## Por qué es importante

SQL Injection está dentro del **OWASP Top 10**, la lista de los riesgos de seguridad web más críticos a nivel mundial. A pesar de ser muy conocida, sigue siendo común porque nace de un error sencillo: confiar en los datos que escribe el usuario. Entenderla es el primer paso para poder prevenirla.

## Importante antes de practicar

Todas las pruebas de este manual se realizan sobre **DVWA (Damn Vulnerable Web Application)**, una aplicación creada a propósito para practicar seguridad. Estas técnicas no deben aplicarse nunca sobre páginas o sistemas reales sin autorización, ya que eso constituye un delito.

## Recorrido del manual

El manual incluye tres prácticas, de la más simple a la más avanzada:

- **Módulo 2 · El payload explicado** → qué significa `' OR '1'='1' --`.
- **Módulo 3 · Preparar DVWA en Kali** → dejar el entorno listo.
- **Práctica 1 · Inyección manual** → el ataque escribiendo las consultas a mano.
- **Práctica 2 · sqlmap** → el ataque automático que roba y descifra la base de datos.
- **Práctica 3 · John the Ripper** → romper los hash para revelar las contraseñas reales.
- **Cómo prevenirlo** → código vulnerable vs. código seguro (antes y después).
