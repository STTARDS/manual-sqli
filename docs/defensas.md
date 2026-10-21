---
sidebar_position: 6
title: Defensas y conclusión
---

# ¿Cómo se previene?

La buena noticia es que SQL Injection, aunque es peligrosa, se puede prevenir. Estas son las defensas, de la más importante a las complementarias:

1. **Consultas parametrizadas (prepared statements).** Separan el código SQL de los datos que escribe el usuario, de modo que el texto nunca pueda transformarse en una orden. Es la defensa principal.
2. **Validación de datos.** Revisar y limpiar todo lo que escribe el usuario antes de usarlo.
3. **Mínimo privilegio.** Que el usuario de la base de datos solo pueda hacer lo estrictamente necesario, para limitar el daño si algo falla.
4. **Uso de un ORM.** Una herramienta que arma las consultas de forma segura por defecto.
5. **Firewall de aplicaciones web (WAF).** Una capa extra que filtra ataques conocidos.
6. **No mostrar errores detallados** de SQL al usuario final, porque dan pistas al atacante.

## Ejemplo de consulta segura

Así se vería un inicio de sesión bien hecho en PHP, usando consultas parametrizadas:

```php
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ? AND clave = ?");
$stmt->execute([$usuario, $clave]);
```

Aquí los datos del usuario nunca se mezclan con el código. Aunque alguien escriba `' OR '1'='1`, el sistema lo trata como texto común y no como una orden, así que el ataque no funciona.

## Conclusión

SQL Injection sigue siendo una de las vulnerabilidades más críticas y, al mismo tiempo, una de las más prevenibles. El problema de fondo no está en la base de datos, sino en la forma en que la aplicación construye sus consultas. Programando con cuidado y usando consultas parametrizadas, este ataque deja de ser una amenaza.
