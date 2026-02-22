<?php

include'../conexion.php';
$conexion=conexion();

$id_inventario=$_POST['id_inventario'];
$id_producto=$_POST['id_producto'];
$stock=$_POST['stock'];
$ubicacion=$_POST['ubicacion'];


$sql = "INSERT INTO inventario ( id_producto, stock, ubicacion)
        VALUES ( '$id_producto', '$stock', '$ubicacion')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El registro se guardo con exito!!);
    location.href = 'formulario_inventario.php' </script>";
}else{
    echo"Error al guardar la información!!";
}