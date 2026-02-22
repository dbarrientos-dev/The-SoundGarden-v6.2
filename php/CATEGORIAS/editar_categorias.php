<?php
include '../conexion.php';
$conexion = conexion();

$id_categoria = $_POST['id_categoria'];
$nom_categoria = $_POST['nom_categoria'];
$descripcion = $_POST['descripcion'];

$sql = "UPDATE categorias 
        SET nom_categoria='$nom_categoria', descripcion='$descripcion'
        WHERE id_categoria='$id_categoria'";

$query = mysqli_query($conexion, $sql);

if ($query) {
    echo "<script>
            alert('El registro se actualizó con éxito');
            window.location.href = 'formulario_categorias.php';
          </script>";
} else {
    echo "<script>
            alert('Error al actualizar el registro');
            window.location.href = 'formulario_categorias.php';
          </script>";
}

