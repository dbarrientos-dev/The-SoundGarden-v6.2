<?php

include"../conexion.php";
$conexion = conexion();

$id_pedido=$_GET['id_pedido'];

$sql = "DELETE FROM pedido WHERE id_pedido=$id_pedido";
$query = mysqli_query($conexion, $sql);

    if ($query) {
        echo "<script>
                alert('El registro con ID $id_pedido se eliminó');
                window.location.href = 'formulario_pedido.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al eliminar el registro');
                window.location.href = 'formulario_pedido.php';
              </script>";
    }

