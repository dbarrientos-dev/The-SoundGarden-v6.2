<?php

include'../conexion.php';
$conexion=conexion();


$id_factura=$_POST['id_factura'];
$id_pedido=$_POST['id_pedido'];
$fecha_emision=$_POST['fecha_emision'];
$total=$_POST['total'];

$sql = "INSERT INTO factura (id_factura, id_pedido, fecha_emision, total)
        VALUES ('$id_factura', '$id_pedido', '$fecha_emision', '$total')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('La factura se guardo con exito!!');
    location.href = 'formulario_factura.php' </script>";
}else{
    echo"Error al guardar la información!!";
}