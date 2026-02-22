<?php

include'../conexion.php';
$conexion=conexion();


$id_producto=$_POST['id_produto'];
$nom_producto=$_POST['nom_producto'];
$id_categoria=$_POST['id_categoria'];
$marca=$_POST['marca'];
$precio=$_POST['precio'];
$descripcion=$_POST['descripcion'];
$id_proveedor=$_POST['id_proveedor'];


$sql = "INSERT INTO productos ( nom_producto, id_categoria, marca, precio, descripcion, id_proveedor)
        VALUES ( '$nom_producto', '$id_categoria', '$marca', '$precio', '$descripcion', '$id_proveedor')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El producto se guardo con exito!!');
    location.href = 'formulario_producto.php' </script>";
}else{
    echo"Error al guardar la información!!";
}