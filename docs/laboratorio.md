---
sidebar_position: 2
title: Montar el laboratorio
---

# Montar el laboratorio seguro (Kali Linux + DVWA)

Para practicar de forma **legal** se utiliza **DVWA (Damn Vulnerable Web Application)**, una aplicación web creada a propósito con vulnerabilidades para aprender.

## Opción recomendada: DVWA con Docker sobre Kali

```bash
# 1. Actualizar Kali e instalar Docker
sudo apt update
sudo apt install -y docker.io

# 2. Iniciar el servicio de Docker
sudo systemctl enable docker --now

# 3. Descargar y ejecutar DVWA
sudo docker run --rm -it -p 80:80 vulnerables/web-dvwa
```

Luego abrir en el navegador de Kali: **http://localhost**

- **Usuario:** `admin`
- **Contraseña:** `password`

:::tip Primer paso dentro de DVWA
Al entrar, dar clic en **Create / Reset Database** para iniciar la base de datos, y luego ir a **DVWA Security** y poner el nivel en **Low** (para empezar con el caso más fácil de entender).
:::

*(Alternativa sin Docker: en Kali también funciona `sudo apt install dvwa` y luego el comando `dvwa-start`.)*
