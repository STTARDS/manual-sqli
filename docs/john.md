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

:::note Las contraseñas de DVWA
| Hash | Contraseña real |
|------|-----------------|
| `5f4dcc3b5aa765d61d8327deb882cf99` | password |
| `e99a18c428cb38d5f260853678922e03` | abc123 |
| `8d3533d75ae2c3966d7e0d4fcc69216b` | charley |
| `0d107d09f5bbe40cade3de5c71e9e9b7` | letmein |
:::
