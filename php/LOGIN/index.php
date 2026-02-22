<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Inicio de Sesión</title>
    <link rel="stylesheet" href="../login_estilo.css">
</head>
<body>
    <div>
        <form action="validar.php" method="POST">
            <h1 class="tituloo"><b>Inicio de Sesión</b></h1>
            
            <input type="hidden" name="id_loguin">
            <p>
                <label>ID cliente</label>
                <input type="number" name="id_cliente" required>
            </p>
            <p>
                <label>Contraseña</label>
                <input type="password" name="contraseña" required>
            </p>
            
            <button type="submit">Ingresar</button>
        </form>
    </div>
</body>
</html>
