---
sidebar_position: 8
title: "Cómo prevenirlo (código seguro)"
---

# Cómo prevenirlo: código vulnerable vs. código seguro

La buena noticia es que SQL Injection, aunque es peligrosa, **se previene con facilidad** si se programa con cuidado. Aquí se compara el código mal hecho (vulnerable) con el código corregido (seguro), para ver exactamente qué cambia.

## Ejemplo 1: la consulta de usuario (como en DVWA)

### Antes (código vulnerable)

El error es **pegar directamente** lo que escribe el usuario dentro de la consulta:

```php
// PHP vulnerable
$id = $_GET['id'];
$sql = "SELECT first_name, last_name FROM users WHERE user_id = '$id'";
$resultado = mysqli_query($conexion, $sql);
```

Si el usuario escribe `1' OR '1'='1`, la consulta se convierte en algo siempre verdadero y devuelve toda la tabla.

### Después (código seguro)

Se usan **consultas parametrizadas** (*prepared statements*): el dato y el código SQL van por separado, así el texto del usuario nunca se interpreta como una orden.

```php
// PHP seguro (con PDO)
$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT first_name, last_name FROM users WHERE user_id = ?");
$stmt->execute([$id]);
$resultado = $stmt->fetchAll();
```

El `?` es un hueco que la base de datos rellena tratando `$id` **siempre como texto**. Aunque el usuario escriba `1' OR '1'='1`, se busca un usuario que se llame literalmente "1' OR '1'='1", no se ejecuta como código.

## Ejemplo 2: un login (cómo se vulnera y cómo se arregla)

### Antes (login vulnerable)

```php
// PHP vulnerable
$usuario = $_POST['usuario'];
$clave   = $_POST['clave'];
$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_num_rows($resultado) > 0) {
    echo "¡Bienvenido!";   // acceso concedido
}
```

**Qué hace cada línea:**

| Línea | Qué hace |
|-------|----------|
| `$usuario = $_POST['usuario'];` | Toma el usuario que la persona escribió en el formulario. |
| `$clave = $_POST['clave'];` | Toma la contraseña escrita en el formulario. |
| `$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND clave = '$clave'";` | Arma la consulta **pegando directamente** esos valores dentro del texto. **Aquí está el fallo**: el dato del usuario se mezcla con el código SQL. |
| `$resultado = mysqli_query($conexion, $sql);` | Envía esa consulta a la base de datos y guarda lo que responde. |
| `if (mysqli_num_rows($resultado) > 0) {` | Pregunta: ¿la consulta devolvió al menos una fila? (es decir, ¿encontró un usuario que coincida?). |
| `echo "¡Bienvenido!";` | Si hubo coincidencia, concede el acceso. |

**Cómo se vulnera:** en el campo usuario se escribe:

```
' OR '1'='1' -- 
```

La consulta queda:

```sql
SELECT * FROM usuarios WHERE usuario = '' OR '1'='1' -- ' AND clave = '...'
```

La condición es siempre verdadera y el `--` anula la revisión de la contraseña. **Se entra sin saber la contraseña.**

### Después (login seguro)

```php
// PHP seguro (con PDO)
$usuario = $_POST['usuario'];
$clave   = $_POST['clave'];
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ? AND clave = ?");
$stmt->execute([$usuario, $clave]);

if ($stmt->rowCount() > 0) {
    echo "¡Bienvenido!";
}
```

**Qué hace cada línea:**

| Línea | Qué hace |
|-------|----------|
| `$stmt = $pdo->prepare("... usuario = ? AND clave = ?");` | Prepara la consulta con **huecos** (`?`) en lugar de pegar los datos. El código SQL queda fijo y separado de los datos. |
| `$stmt->execute([$usuario, $clave]);` | Rellena los huecos con los datos, tratándolos **siempre como texto**, nunca como código. |
| `if ($stmt->rowCount() > 0) {` | Pregunta si hubo una coincidencia real. |
| `echo "¡Bienvenido!";` | Concede el acceso solo si de verdad coincide. |

Ahora, aunque se escriba `' OR '1'='1' -- `, se busca un usuario cuyo nombre sea exactamente ese texto. Como no existe, **el acceso se niega**. El ataque deja de funcionar.

> Nota adicional: las contraseñas nunca deberían guardarse en MD5 ni en texto plano, sino con funciones diseñadas para eso como `password_hash()` de PHP (bcrypt), que resisten a herramientas como John the Ripper.

## Otras defensas importantes

Además de las consultas parametrizadas (la defensa principal), se recomiendan:

1. **Validar los datos** que escribe el usuario antes de usarlos.
2. **Mínimo privilegio**: que el usuario de la base de datos solo pueda hacer lo necesario.
3. **No mostrar errores de SQL** al usuario final (dan pistas al atacante).
4. Usar un **ORM** o un **WAF** como capas extra de protección.

## Conclusión

SQL Injection sigue siendo una de las vulnerabilidades más críticas y, a la vez, una de las más prevenibles. El problema de fondo no está en la base de datos, sino en **la forma en que la aplicación construye sus consultas**. Con consultas parametrizadas, el ataque que se vio en las tres prácticas **deja de ser posible**.
