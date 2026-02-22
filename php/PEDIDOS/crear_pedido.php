<?php

include'../conexion.php';
$conexion=conexion();

$id_pedido=$_POST['id_pedido'];
$id_cliente=$_POST['id_cliente'];
$fecha_pedido=$_POST['fecha_pedido'];
$direccion_envio=$_POST['direccion_envio'];
$estado_pedido=$_POST['estado_pedido'];
$metodo_pago=$_POST['metodo_pago'];

$sql = "INSERT INTO pedido (id_cliente, fecha_pedido, direccion_envio, estado_pedido, metodo_pago)
        VALUES ('$id_cliente', '$fecha_pedido', '$direccion_envio', '$estado_pedido', '$metodo_pago')";

$query=mysqli_query($conexion,$sql);

if($query){
    //header("location: index.php);
    echo "<script> alert('El registro se guardo con exito!!');
    location.href = 'formulario_pedido.php' </script>";
}else{
    echo"Error al guardar la información!!";
}