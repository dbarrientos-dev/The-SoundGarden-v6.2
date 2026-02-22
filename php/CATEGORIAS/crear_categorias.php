<?php

include'../conexion.php';
$conexion=conexion();

$id_categoria=$_POST['id_categoria'];
$nom_categoria=$_POST['nom_categoria'];
$descripcion=$_POST['descripcion'];

$sql = "INSERT INTO categorias (nom_categoria, descripcion)
        VALUES ('$nom_categoria', '$descripcion')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El registro se guardo con exito!! $nom_categoria');
    location.href = 'formulario_categorias.php' </script>";
}else{
    echo"Error al guardar la información!!";
}