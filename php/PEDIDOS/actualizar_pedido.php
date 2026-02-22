<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Pedidos</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_pedido=$_GET['id_pedido'];

$sql="SELECT * FROM pedido WHERE id_pedido='$id_pedido'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_pedido.php" method="post">
        <h1 class="tituloo"><b>Registro de Pedidos</b></h1>
        <div class="form-grid">

            <input type="hidden" name="id_pedido" value="<?php echo $row['id_pedido']; ?>">
            <p>
                <label for="">ID cliente</label>
                <input type="number" name="id_cliente" value="<?php echo $row['id_cliente']; ?>" readonly>
            </p>
            <p>
                <label for="">Fecha Pedido</label>
                <input type="date" name="fecha_pedido" value="<?php echo $row['fecha_pedido']; ?>">
            </p>
            <p>
                <label for="">Direccion de Envio</label>
                <input type="text" name="direccion_envio" value="<?php echo $row['direccion_envio']; ?>">
            </p>
            <p>
                <label for="">Estado del Pedido</label>
                <input type="text" name="estado_pedido" value="<?php echo $row['estado_pedido']; ?>">
            </p>
            <p>
                <label for="">Metodo de Pago</label>
                <input type="text" name="metodo_pago" value="<?php echo $row['metodo_pago']; ?>">
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