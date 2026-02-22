<?php

include'../conexion.php';
$conexion=conexion();

$id_detalle=$_POST['id_detalle'];
$id_pedido=$_POST['id_pedido'];
$cantidad=$_POST['cantidad'];
$precio_unitario=$_POST['precio_unitario'];
$subtotal=$_POST['subtotal'];

$sql = "INSERT INTO detalle_pedido (id_pedido, cantidad, precio_unitario, subtotal)
        VALUES ('$id_pedido', '$cantidad', '$precio_unitario', '$subtotal')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El registro se guardo con exito!! $id_detalle');
    location.href = 'formulario_detalle.php' </script>";
}else{
    echo"Error al guardar la información!!";
}