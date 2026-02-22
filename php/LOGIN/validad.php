<?php
include '../conexion.php';
$conexion = conexion();

$id_login=$_POST['id_login'];
$id_cliente=$_POST['id_cliente'];
$contraseña=$_POST['contraseña'];

$sql = "SELECT * FROM clientes WHERE id_cliente = '$id_cliente'";
$resultado = mysqli_query($conexion, $sql);

if ($fila = mysqli_fetch_assoc($resultado)) {
    if (password_verify($contraseña, $fila['contraseña'])) {
        echo "<script>
            alert('Bienvenido');
            location.href = '';
        </script>";
    } else {
        echo "<script>
            alert('Contraseña incorrecta');
            location.href = 'index.php';
        </script>";
    }
} else {
    echo "<script>
        alert('Usuario no encontrado');
        location.href = 'index.php';
    </script>";
}

mysqli_free_result($resultado);
mysqli_close($conexion);
