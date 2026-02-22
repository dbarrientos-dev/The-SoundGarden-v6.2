<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Detalle</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_detalle=$_GET['id_detalle'];

$sql="SELECT * FROM detalle_pedido WHERE id_detalle='$id_detalle'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_detalle.php" method="post">
        <h1 class="tituloo"><b>Registro de Detalle de Pedido</b></h1>
        <div class="form-grid">

        <input type="hidden" name="id_detalle" value="<?php echo $row['id_detalle']; ?>">
            <p>
                <label for="">ID Pedido</label>
                <input type="number" name="id_pedido" value="<?php echo $row['id_pedido']; ?>">
            </p>
            <p>
                <label for="">Cantidad</label>
                <input type="number" name="cantidad" value="<?php echo $row['cantidad']; ?>">
            </p>
            <p>
                <label for="">Precio >Unitario</label>
                <input type="number" name="precio_unitario" value="<?php echo $row['precio_unitario']; ?>">
            </p>
            <p>
                <label for="">Subtotal</label>
                <input type="number" name="subtotal" value="<?php echo $row['subtotal']; ?>">
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