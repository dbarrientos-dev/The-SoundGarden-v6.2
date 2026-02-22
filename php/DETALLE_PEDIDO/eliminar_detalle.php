<?php

include"../conexion.php";
$conexion = conexion();

$id_detalle=$_GET['id_detalle'];

$sql = "DELETE FROM detalle WHERE id_detalle = $id_detalle";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro se eliminó');
                window.location.href = 'formulario_detalle.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_detalle.php';
              </script>";
    }

