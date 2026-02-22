<?php
include '../conexion.php';
$conexion = conexion();

$id_detalle=$_POST['id_detalle'];
$id_pedido=$_POST['id_pedido'];
$cantidad=$_POST['cantidad'];
$precio_unitario=$_POST['precio_unitario'];
$subtotal=$_POST['subtotal'];

$sql = "UPDATE detalle_pedido SET id_pedido='$id_pedido', cantidad='$cantidad', precio_unitario='$precio_unitario'
,subtotal='$subtotal'
WHERE id_categoria='$id_categoria'";

$query = mysqli_query($conexion, $sql);

if ($query) {
    echo "<script>
            alert('El registro se actualizó con éxito');
            window.location.href = 'formulario_detalle.php';
          </script>";
} else {
    echo "<script>
            alert('Error al actualizar el registro');
            window.location.href = 'formulario_detalle.php';
          </script>";
}

