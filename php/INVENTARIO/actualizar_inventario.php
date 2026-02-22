<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Inventario</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_inventario=$_GET['id_inventario'];

$sql="SELECT * FROM inventario WHERE id_inventario='$id_inventario'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_inventario.php" method="post">
        <h1 class="tituloo"><b>Registro del Inventario</b></h1>
        <div class="form-grid">
            
            <input type="hidden" name="id_inventario" value="<?php echo $row['id_inventario']; ?>">
            <p>
                <label for="">ID Producto</label>
                <input type="number" name="id_producto" value="<?php echo $row['id_producto']; ?>">
            </p>
            <p>
                <label for="">Stock</label>
                <input type="text" name="stock" value="<?php echo $row['stock']; ?>">
            </p>
            <p>
                <label for="">Ubicacion</label>
                <input type="text" name="ubicacion" value="<?php echo $row['ubicacion']; ?>">
            </p>

        </div>
        <div class="botones">
            <button type="submit" value="Guardar">Guardar</button>
        </div>
    </form>
</div>
</div>
</body>
</html>