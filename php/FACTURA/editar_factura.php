<?php

include'../conexion.php';
$conexion=conexion();

$id_factura=$_POST['id_factura'];
$id_pedido=$_POST['id_pedido'];
$fecha_emision=$_POST['fecha_emision'];
$total=$_POST['total'];

$sql = "UPDATE factura SET id_pedido='$id_pedido',fecha_emision='$fecha_emision',total='$total'
WHERE id_factura=$id_factura";

$query = mysqli_query($conexion, $sql);

 if ($query) {
        echo "<script>
                alert('El registro $id_factura se actualizó con exito');
                window.location.href = 'formulario_factura.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al actualizar el registro');
                window.location.href = 'formulario_factura.php';
              </script>";
    }
