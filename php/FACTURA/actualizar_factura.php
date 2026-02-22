<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Facturas</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_factura=$_GET['id_factura'];

$sql="SELECT * FROM factura WHERE id_factura='$id_factura'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_factura.php" method="post">
        <h1 class="tituloo"><b>Registro de Facturas</b></h1>
        <div class="form-grid">

        <input type="hidden" name="id_factura" value="<?php echo $row['id_factura']; ?>">
            <p>
                <label for="">ID Pedido</label>
                <input type="number" name="id_pedido" value="<?php echo $row['id_pedido']; ?>" readonly>
            </p>
            <p>
                <label for="">Fecha de Emision</label>
                <input type="date" name="fecha_emision" value="<?php echo $row['fecha_emision']; ?>">
            </p>
            <p>
                <label for="">Total</label>
                <input type="number" name="total" value="<?php echo $row['total']; ?>">
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