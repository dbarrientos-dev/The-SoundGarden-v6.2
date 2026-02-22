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

$sql = "UPDATE productos SET nom_producto='$nom_producto',categoria='$categoria',marca='$marca',precio='$precio',descripcion='$descripcion'
WHERE id_producto=$id_producto";

$query = mysqli_query($conexion, $sql);

 if ($query) {
        echo "<script>
                alert('El registro $nom_producto se actualizó con exito');
                window.location.href = 'formulario_producto.php';
              </script>";
    } else {
        echo "<script>
                alert('Error al actualizar el registro');
                window.location.href = 'formulario_producto.php';
              </script>";
    }
