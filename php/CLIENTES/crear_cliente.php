<?php

include'../conexion.php';
$conexion=conexion();

$id_cliente=$_POST['id_cliente'];
$nombre=$_POST['nombre'];
$apellido=$_POST['apellido'];
$email=$_POST['email'];
$telefono=$_POST['telefono'];
$direccion=$_POST['direccion'];
$ciudad=$_POST['ciudad'];

$sql = "INSERT INTO clientes (id_cliente, nombre, apellido, email, telefono, direccion, ciudad)
        VALUES ('$id_cliente', '$nombre', '$apellido', '$email', '$telefono', '$direccion', '$ciudad')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El registro se guardo con exito!! $nombre');
    location.href = 'formulario_clientes.php' </script>";
}else{
    echo"Error al guardar la información!!";
}