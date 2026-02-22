<?php

include"../conexion.php";
$conexion = conexion();

$id_cliente=$_GET['id_cliente'];

$sql = "DELETE FROM clientes WHERE id_cliente = $id_cliente";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro con ID $id_cliente se eliminó');
                window.location.href = 'formulario_clientes.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_clientes.php';
              </script>";
    }

