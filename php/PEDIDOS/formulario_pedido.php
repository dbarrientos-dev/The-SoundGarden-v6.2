<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM pedido";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario de Pedido</title>
</head>
<body>
    <div>
        <form action="crear_pedido.php" method="POST">
            <h1 class="tituloo"><b>Registro de Pedidos</b></h1>
        <div>

        <input type="hidden" name="id_pedido" value="<?php echo $row['id_pedido']; ?>">
            <p>
            <label for="">ID cliente</label>
            <input type="number" name="id_cliente">
            </p>
            <p>
            <label for="">Fecha Pedido</label>
            <input type="date" name="fecha_pedido">
            </p>
            <p>
            <label for="">Direccion Envio</label>
            <input type="text" name="direccion_envio">
            </p>
            <p>
            <label for="">Estado Pedido</label>
            <input type="text" name="estado_pedido">
            </p>
            <p>
            <label for="">Metodo de Pago</label>
            <input type="text" name="metodo_pago">
            </p>
<br>
<br>
            <button type="submit" value="Guardar">GUARDAR</button>
            <button type="reset" value="Limpiar">LIMPIAR</button>
        </div>
        
        </form>
    </div>

    <div>
            <h3>Pedidos Registrados</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID pedido</th>
                        <th>ID Cliente</th>
                        <th>Fecha Pedido</th>
                        <th>Direccion Envio</th>
                        <th>Estado Pedido</th>
                        <th>Metodo Pago</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_pedido']?></td>
                        <td><?=$row['id_cliente']?></td>
                        <td><?=$row['fecha_pedido']?></td>
                        <td><?=$row['direccion_envio']?></td>
                        <td><?=$row['estado_pedido']?></td>
                        <td><?=$row['metodo_pago']?></td>
                        <td><a href="actualizar_pedido.php?id_pedido=<?=$row['id_pedido']?>">EDITAR</a></td>
                        <td><a href="eliminar_pedido.php?id_pedido=<?=$row['id_pedido']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>