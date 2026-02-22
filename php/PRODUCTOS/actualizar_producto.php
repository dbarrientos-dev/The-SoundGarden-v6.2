<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Productos</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_producto=$_GET['id_producto'];

$sql="SELECT * FROM productos WHERE id_producto='$id_producto'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_producto.php" method="post">
        <h1 class="tituloo"><b>Registro de Productos</b></h1>
        <div class="form-grid">

            <input type="hidden" name="id_producto" value="<?php echo $row['id_producto']; ?>">
            <p>
                <label for="">Nombre del Producto</label>
                <input type="text" name="nom_producto" value="<?php echo $row['nom_producto']; ?>" readonly>
            </p>
            <p>
                <label for="">Categoria</label>
                <input type="text" name="categoria" value="<?php echo $row['categoria']; ?>">
            </p>
            <p>
                <label for="">Marca</label>
                <input type="text" name="marca" value="<?php echo $row['marca']; ?>">
            </p>
            <p>
                <label for="">Precio</label>
                <input type="number" name="precio" value="<?php echo $row['precio']; ?>">
            </p>
            <p>
                <label for="">Descripcion</label>
                <input type="text" name="descripcion" value="<?php echo $row['descripcion']; ?>">
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