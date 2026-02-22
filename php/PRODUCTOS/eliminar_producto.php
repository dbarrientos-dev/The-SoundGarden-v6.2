<?php

include"../conexion.php";
$conexion = conexion();

$id_producto=$_GET['id_producto'];

$sql = "DELETE FROM productos WHERE id_producto = $id_producto";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro se eliminó');
                window.location.href = 'formulario_producto.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_producto.php';
              </script>";
    }

