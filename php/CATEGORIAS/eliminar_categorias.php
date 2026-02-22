<?php

include"../conexion.php";
$conexion = conexion();

$id_categoria=$_GET['id_categoria'];

$sql = "DELETE FROM categorias WHERE id_categoria = $id_categoria";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro se eliminó');
                window.location.href = 'formulario_categorias.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_categorias.php';
              </script>";
    }

