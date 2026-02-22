<?php
session_start();
include('conexion.php');

// Verifica que el formulario envió los datos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['nom_usuario'];
    $password = $_POST['password'];

    // Conectar a la base de datos
    $conexion = conexion();

    // Buscar usuario en la base de datos
    $consulta = "SELECT * FROM usuarios WHERE nom_usuario = '$usuario' AND password = '$password'";
    $resultado = mysqli_query($conexion, $consulta);

    if (mysqli_num_rows($resultado) > 0) {
        // Usuario válido
        $_SESSION['usuario'] = $usuario;
        header("Location: panel.php");
        exit();
    } else {
        // Usuario o contraseña incorrectos
        echo "<script>
                alert('Usuario o contraseña incorrectos');
                window.location.href='administrar.html';
              </script>";
        exit();
    }

    mysqli_close($conexion);
} else {
    header("Location: administrar.html");
    exit();
}
?>
