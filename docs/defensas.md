---
sidebar_position: 5
title: Defensas y conclusión
---

# ¿Cómo se previene? (la parte más importante)

Se proponen las siguientes defensas, de la más importante a las complementarias:

1. **Consultas parametrizadas / *prepared statements*** → separan el código SQL de los datos del usuario. Es la defensa principal.
2. **Validación y saneamiento** de todo lo que escribe el usuario.
3. **Principio de mínimo privilegio**: que el usuario de la base de datos solo pueda hacer lo necesario.
4. **Usar un ORM** que trabaje con parámetros por defecto.
5. **WAF (Web Application Firewall)** como capa extra de protección.
6. **No mostrar errores de SQL detallados** al usuario final.

Ejemplo de consulta **segura** (PHP con PDO):

```php
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ? AND clave = ?");
$stmt->execute([$usuario, $clave]);
```

Aquí el dato nunca se mezcla con el código: aunque el usuario escriba `' OR '1'='1`, se trata como texto y no como instrucción.

## Conclusión

Se concluye que SQL Injection sigue siendo una de las vulnerabilidades más críticas —está en el **OWASP Top 10**— y a la vez de las más prevenibles. Yo considero que lo más valioso de esta práctica es entender que el problema de fondo no está en la base de datos, sino en **la forma en que la aplicación construye sus consultas**.
