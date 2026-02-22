<?php

include"../conexion.php";
$conexion = conexion();

$id_inventario=$_GET['id_inventario'];

$sql = "DELETE FROM inventario WHERE id_inventario=$id_inventario";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro con ID $id_inventario se eliminó');
                window.location.href = 'formulario_inventario.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_inventario.php';
              </script>";
    }

