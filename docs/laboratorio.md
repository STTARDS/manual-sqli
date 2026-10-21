---
sidebar_position: 3
title: Preparar DVWA en Kali
---

# Preparar DVWA en Kali Linux

Para demostrar el ataque se usa **DVWA (Damn Vulnerable Web Application)**, una aplicación web pensada para practicar seguridad. Se instala dentro de **Kali Linux**, el sistema operativo que incluye las herramientas necesarias.

Esta sección parte de que Kali Linux ya está instalado y funcionando.

## Paso 1. Instalar y arrancar DVWA con Docker

Dentro de Kali, se abre la terminal y se escriben estos comandos uno por uno:

```bash
# Actualizar el sistema
sudo apt update

# Instalar Docker (el programa que ejecuta DVWA)
sudo apt install -y docker.io

# Encender el servicio de Docker
sudo systemctl enable docker --now

# Descargar y ejecutar DVWA
sudo docker run --rm -it -p 80:80 vulnerables/web-dvwa
```

El último comando deja DVWA funcionando. Esa terminal se mantiene abierta mientras dure la práctica.

## Paso 2. Abrir DVWA en el navegador

En el navegador de Kali se ingresa a la dirección:

```
http://localhost
```

Los datos de acceso son:

- **Usuario:** admin
- **Contraseña:** password

## Paso 3. Dejar DVWA lista para el ataque

1. Al entrar, se presiona el botón **Create / Reset Database** para iniciar la base de datos.
2. Luego se va al menú **DVWA Security** y se cambia el nivel a **Low**. Este nivel no tiene protecciones, por lo que es ideal para mostrar cómo funciona el ataque desde cero.
3. Se guarda con **Submit**.

Con esto, DVWA queda preparada. El siguiente paso es realizar la inyección.

## Alternativa sin Docker

Kali también incluye DVWA como paquete. Si se prefiere, se puede instalar así:

```bash
sudo apt install dvwa
dvwa-start
```
