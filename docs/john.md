---
sidebar_position: 6
title: "Práctica 3: Romper contraseñas (John)"
---

# Práctica 3 · Romper contraseñas con John the Ripper

En las prácticas anteriores se obtuvieron las contraseñas en forma de **hash MD5** (cadenas como `5f4dcc3b5aa765d61d8327deb882cf99`). Un hash parece seguro, pero si la contraseña es débil se puede **recuperar la contraseña original**. Eso se demuestra con **John the Ripper**, otra herramienta incluida en Kali.

## Paso 1. Guardar los hash en un archivo

En la terminal se crea un archivo de texto con los hash obtenidos, uno por línea:

```bash
nano hashes.txt
```

Se pegan los hash (los que se sacaron en la Práctica 1), por ejemplo:

```
5f4dcc3b5aa765d61d8327deb882cf99
e99a18c428cb38d5f260853678922e03
8d3533d75ae2c3966d7e0d4fcc69216b
0d107d09f5bbe40cade3de5c71e9e9b7
```

Se guarda con `Ctrl + O`, `Enter`, y se sale con `Ctrl + X`.

## Paso 2. Preparar el diccionario (solo la primera vez)

John prueba millones de contraseñas comunes usando el diccionario **rockyou**. En Kali viene comprimido; se descomprime una vez:

```bash
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
```

> Si dice que el archivo no existe, es porque ya estaba descomprimido. No pasa nada, continúa.

## Paso 3. Romper los hash

```bash
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
```

John va probando contraseñas del diccionario contra cada hash. Para estas contraseñas débiles, las encuentra en segundos.

## Paso 4. Ver las contraseñas descifradas

```bash
john --show --format=raw-md5 hashes.txt
```

Muestra el hash junto a la **contraseña real**. El resultado deja claro el mensaje final: las contraseñas estaban "cifradas", pero por ser débiles se rompen al instante.

**Las contraseñas reales de DVWA**, para comprobar el resultado:

| Hash | Contraseña real |
|------|-----------------|
| `5f4dcc3b5aa765d61d8327deb882cf99` | password |
| `e99a18c428cb38d5f260853678922e03` | abc123 |
| `8d3533d75ae2c3966d7e0d4fcc69216b` | charley |
| `0d107d09f5bbe40cade3de5c71e9e9b7` | letmein |

## Otros tipos de hash (SHA-1, SHA-256, etc.)

MD5 no es el único tipo de hash. Cada uno necesita su propio `--format`, y **no se deben mezclar distintos tipos en el mismo archivo ni en el mismo comando**. Lo más limpio es un archivo por cada tipo.

Los tipos se reconocen por su **longitud**:

| Tipo | Longitud (caracteres) | `--format` |
|------|------------------------|-----------|
| MD5 | 32 | `raw-md5` |
| SHA-1 | 40 | `raw-sha1` |
| SHA-256 | 64 | `raw-sha256` |
| SHA-512 | 128 | `raw-sha512` |

Por ejemplo, para romper hashes **SHA-256**, se guardan en su propio archivo y se usa su formato:

```bash
john --format=raw-sha256 --wordlist=/usr/share/wordlists/rockyou.txt hashes_sha256.txt
```

```bash
john --show --format=raw-sha256 hashes_sha256.txt
```

## Demostración: contraseña débil vs. contraseña fuerte

John no "rompe" el algoritmo: lo que hace es **adivinar la contraseña** probando el diccionario. Por eso el resultado depende de la contraseña, no tanto del tipo de hash. Es una demostración muy clara:

- Una contraseña **común** (`password`, `123456`, `qwerty`) está en el diccionario, así que John la encuentra en segundos.
- Una contraseña **fuerte y aleatoria** (`Tr#9xQ!m2026`) no está en el diccionario, así que John **no la encuentra**.

Conclusión para la exposición: un hash más moderno como SHA-256 es mejor que MD5, pero **si la contraseña es débil, igual se rompe**. La defensa real no es solo el tipo de hash, sino **usar contraseñas largas y aleatorias** y funciones pensadas para contraseñas como bcrypt.

> Si John ya rompió un hash antes, lo guarda y no lo vuelve a mostrar como nuevo. Para repetir desde cero se borra su archivo de progreso con `rm ~/.john/john.pot`.
