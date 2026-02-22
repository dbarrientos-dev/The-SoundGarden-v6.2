<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM detalle_pedido";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Detalle Pedido</title>
</head>
<body>
    <div>
        <form action="crear_detalle.php" method="POST">
            <h1 class="tituloo"><b>Registro de Detalles</b></h1>
        <div>

        <input type="hidden" name="id_detalle" value="<?php echo $row['id_detalle']; ?>">
            <p>
            <label for="">ID Pedido</label>
            <input type="number" name="id_pedido">
            </p>
            <p>
            <label for="">Cantidad</label>
            <input type="number" name="cantidad">
            </p>
            <p>
            <label for="">Precio Unitario</label>
            <input type="number" name="precio_unitario">
            </p>
            <p>
            <label for="">Subtotal</label>
            <input type="number" name="subtotal">
            </p>
<br>
<br>
            <button type="submit" value="Guardar">GUARDAR</button>
            <button type="reset" value="Limpiar">LIMPIAR</button>
        </div>
        
        </form>
    </div>

    <div>
            <h3>Categorias Registradas</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID Detalle</th>
                        <th>ID Pedido</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_detalle']?></td>
                        <td><?=$row['id_pedido']?></td>
                        <td><?=$row['cantidad']?></td>
                        <td><?=$row['precio_unitario']?></td>
                        <td><?=$row['subtotal']?></td>
                        <td><a href="actualizar_detalle.php?id_detalle=<?=$row['id_detalle']?>">EDITAR</a></td>
                        <td><a href="eliminar_detalle.php?id_detalle=<?=$row['id_detalle']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>