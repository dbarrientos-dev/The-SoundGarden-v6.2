<?php

include"../conexion.php";
$conexion = conexion();

$id_factura=$_GET['id_factura'];

$sql = "DELETE FROM factura WHERE id_factura = $id_factura";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro con se eliminó');
                window.location.href = 'formulario_factura.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_factura.php';
              </script>";
    }

