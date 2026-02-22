<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM factura";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Facturas</title>
</head>
<body>
    <div>
        <form action="crear_factura.php" method="POST">
            <h1 class="tituloo"><b>Registro de Facturas</b></h1>
        <div>

            <input type="hidden" name="id_factura" value="<?php echo $row['id_factura']; ?>">
            <p>
            <label for="">Id Pedido</label>
            <input type="number" name="id_pedido">
            </p>
            <p>
            <label for="">Fecha de Emision</label>
            <input type="date" name="fecha_emision">
            </p>
            <p>
            <label for="">Total</label>
            <input type="number" name="total">
            </p>
<br>
<br>
            <button type="submit" value="Guardar">GUARDAR</button>
            <button type="reset" value="Limpiar">LIMPIAR</button>
        </div>
        
        </form>
    </div>

    <div>
            <h3>Facturas Registradas</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID Factura</th>
                        <th>ID Pedido</th>
                        <th>Fecha de Emision</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_factura']?></td>
                        <td><?=$row['id_pedido']?></td>
                        <td><?=$row['fecha_emision']?></td>
                        <td><?=$row['total']?></td>
                        <td><a href="actualizar_factura.php?id_factura=<?=$row['id_factura']?>">EDITAR</a></td>
                        <td><a href="eliminar_factura.php?id_factura=<?=$row['id_factura']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>