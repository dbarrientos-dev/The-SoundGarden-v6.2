<?php

include'../conexion.php';
$conexion=conexion();

$id_inventario=$_POST['id_inventario'];
$id_producto=$_POST['id_producto'];
$stock=$_POST['stock'];
$ubicacion=$_POST['ubicacion'];



$sql = "UPDATE inventario SET id_producto='$id_producto',stock='$stock'
WHERE id_inventario=$id_inventario";

$query = mysqli_query($conexion, $sql);

 if ($query) {
        echo "<script>
                alert('El registro $id_inventario se actualizó con exito');
                window.location.href = 'formulario_inventario.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al actualizar el registro');
                window.location.href = 'formulario_inventario.php';
              </script>";
    }
