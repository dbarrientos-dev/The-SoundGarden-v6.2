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


$sql = "UPDATE clientes SET nombre='$nombre',apellido='$apellido',email='$email',telefono='$telefono',
direccion='$direccion',ciudad='$ciudad'

WHERE id_cliente=$id_cliente";

$query = mysqli_query($conexion, $sql);

 if ($query) {
        echo "<script>
                alert('El registro $id_cliente se actualizó con exito');
                window.location.href = 'formulario_clientes.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al actualizar el registro');
                window.location.href = 'formulario_clientes.php';
              </script>";
    }
