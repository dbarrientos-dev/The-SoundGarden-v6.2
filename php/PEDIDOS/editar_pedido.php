<?php

include'../conexion.php';
$conexion=conexion();

$id_pedido=$_POST['id_pedido'];
$id_cliente=$_POST['id_cliente'];
$fecha_pedido=$_POST['fecha_pedido'];
$direccion_envio=$_POST['direccion_envio'];
$estado_pedido=$_POST['estado_pedido'];
$metodo_pago=$_POST['metodo_pago'];


$sql = "UPDATE pedido SET id_cliente='$id_cliente', fecha_pedido='$fecha_pedido',direccion_envio='$direccion_envio',
estado_pedido='$estado_pedido',metodo_pago='$metodo_pago'

WHERE id_pedido=$id_pedido";

$query = mysqli_query($conexion, $sql);

 if ($query) {
        echo "<script>
                alert('El registro $id_pedido se actualizó con exito');
                window.location.href = 'formulario_pedido.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al actualizar el registro');
                window.location.href = 'formulario_pedido.php';
              </script>";
    }
