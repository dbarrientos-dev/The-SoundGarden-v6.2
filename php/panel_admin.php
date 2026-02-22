<?php
session_start();

// Verificar si el usuario inició sesión correctamente
if (!isset($_SESSION['usuario'])) {
    header("Location: administrar.html");
    exit();
}

$usuario = $_SESSION['usuario'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Panel principal - The SoundGarden</title>
  <style>
    body {
      background-color: #ece9d8;
      font-family: "Tahoma", sans-serif;
      color: #000;
      margin: 0;
      padding: 0;
    }

    .ventana {
      width: 400px;
      margin: 100px auto;
      background: #fff;
      border: 2px solid #0055aa;
      box-shadow: 3px 3px 0px #888;
      padding: 20px;
    }

    .barra-titulo {
      background: linear-gradient(to right, #0055aa, #0078d7);
      color: #fff;
      padding: 5px 10px;
      font-weight: bold;
    }

    .contenido {
      margin-top: 15px;
      text-align: center;
    }

    .boton {
      margin-top: 15px;
      padding: 5px 10px;
      border: 1px solid #888;
      background: #d4d0c8;
      cursor: pointer;
      font-family: "Tahoma", sans-serif;
    }

    .boton:hover {
      background: #c0c0c0;
    }
  </style>
</head>

<body>
  <div class="ventana">
    <div class="barra-titulo">Panel de control</div>
    <div class="contenido">
      <p>Bienvenido, <strong><?php echo htmlspecialchars($usuario); ?></strong>.</p>
      <p>Has iniciado sesión correctamente en tu sistema de gestión.</p>
      <form action="cerrar_sesion.php" method="post">
        <button class="boton" type="submit">Cerrar sesión</button>
      </form>
    </div>
  </div>
</body>
</html>
