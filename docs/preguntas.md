---
sidebar_position: 9
title: "Preguntas: qué hace cada comando"
---

# Preguntas frecuentes: qué hace cada comando

Esta sección explica, pieza por pieza, qué hace cada comando y cada símbolo usado en las prácticas. Sirve para responder con seguridad si alguien pregunta "¿y eso qué hace?".

## Sobre las inyecciones (DVWA)

**¿Qué hace `1'`?**
Es solo el número 1 seguido de una comilla. Esa comilla "cierra" antes de tiempo el texto que la aplicación esperaba, por eso la consulta queda mal formada y la base de datos devuelve un error. Ese error confirma que el campo es **vulnerable**: lo que se escribe se está metiendo dentro de la consulta sin filtrar.

**¿Qué hace `1' OR '1'='1`?**
Agrega una condición que **siempre es verdadera** (1 siempre es igual a 1). Como va unida con `OR`, la consulta completa se vuelve verdadera para todas las filas, así que la base de datos devuelve **todos los usuarios** en lugar de uno solo.

**¿Qué hace `UNION SELECT`?**
`UNION` une el resultado de dos consultas en una sola lista. Se aprovecha para "pegar" a la consulta original una segunda consulta propia (la del atacante) y así traer datos que no deberían verse. Para que funcione, la segunda consulta debe tener el **mismo número de columnas** que la primera.

**¿Qué hacen `user()` y `database()`?**
Son funciones de la base de datos: `user()` devuelve el usuario con el que la aplicación se conecta a la base, y `database()` devuelve el nombre de la base de datos actual (en DVWA, `dvwa`).

**¿Qué hace `-- -` al final?**
`--` es el símbolo de **comentario** en SQL: todo lo que viene después se ignora. Así se anula el resto de la consulta original (por ejemplo, la parte que revisaba la contraseña). Se escribe `-- -` (con un guion extra) porque el navegador borra los espacios del final, y sin ese guion el comentario no funcionaría.

## Sobre sqlmap

El comando típico es:

```bash
sqlmap -u "URL" --cookie="PHPSESSID=...; security=low" --batch --dump -D dvwa -T users
```

| Parte | Qué hace |
|-------|----------|
| `sqlmap` | La herramienta que automatiza la detección y explotación de SQL Injection. |
| `-u "URL"` | La dirección que se va a atacar. |
| `--cookie="..."` | La cookie de sesión, para que sqlmap entre como un usuario ya autenticado. |
| `--batch` | Responde "sí" automáticamente a todas las preguntas, para que no se detenga. |
| `--dump` | Descarga (extrae) el contenido de la base de datos. |
| `-D dvwa` | Indica la base de datos objetivo (`dvwa`). |
| `-T users` | Indica la tabla objetivo (`users`). |
| `--dbs` | (variante) lista todas las bases de datos. |
| `--tables` | (variante) lista las tablas de una base. |
| `--level` y `--risk` | Suben la intensidad de las pruebas (más técnicas, más lentas). Se usan cuando el objetivo es "a ciegas", como el login propio. |

**¿Es legal usar sqlmap?** Solo sobre sistemas propios o con permiso escrito. En estas prácticas se usa contra DVWA y el login propio, que corren en la misma computadora (`localhost`).

## Sobre John the Ripper

El comando típico es:

```bash
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
```

| Parte | Qué hace |
|-------|----------|
| `john` | La herramienta para romper (adivinar) contraseñas a partir de sus hash. |
| `--format=raw-md5` | Le dice qué tipo de hash es (MD5 en este caso). |
| `--wordlist=...rockyou.txt` | El diccionario de contraseñas comunes que va a probar. |
| `hashes.txt` | El archivo con los hash a romper. |
| `--show` | Muestra las contraseñas ya descifradas. |

**¿John "rompe" el cifrado?** No. Lo que hace es **probar millones de contraseñas** del diccionario, calcular su hash y compararlo. Si coincide, encontró la contraseña. Por eso solo funciona con contraseñas que estén en el diccionario (las débiles).

## Sobre el montaje (Kali, Docker, PHP)

| Comando | Qué hace |
|---------|----------|
| `sudo docker run -d -p 80:80 --name dvwa vulnerables/web-dvwa` | Descarga y ejecuta DVWA en un contenedor. `-d` lo deja en segundo plano, `-p 80:80` conecta el puerto 80, `--name dvwa` le pone nombre. |
| `sudo docker ps` | Muestra los contenedores que están corriendo. |
| `php -S 0.0.0.0:8080` | Levanta un servidor web local con PHP, en el puerto 8080, para la app de login propia. |
| `localhost` | Significa "esta misma computadora". Por eso los ataques son locales, no a sitios externos. |

## Sobre el código (por qué es vulnerable)

**¿Por qué el código es vulnerable?**
Porque **pega directamente** el texto del usuario dentro de la consulta SQL (concatenación). Así, si el usuario escribe símbolos de SQL, estos se ejecutan como parte de la orden.

**¿Qué son las consultas parametrizadas (prepared statements)?**
Son la forma segura de hacer consultas: el código SQL y los datos del usuario van **por separado**. El `?` es un hueco que la base de datos rellena tratando el dato **siempre como texto**, nunca como una orden. Por eso aunque el usuario escriba `' OR '1'='1`, no funciona el ataque.

**¿Por qué MD5 no es suficiente?**
MD5 es un hash rápido y antiguo: las contraseñas débiles se rompen al instante con un diccionario. Para contraseñas se recomienda **bcrypt** (por ejemplo `password_hash()` en PHP), que está diseñado para ser lento y resistir estos ataques.
