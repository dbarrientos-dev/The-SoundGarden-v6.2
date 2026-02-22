<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM inventario";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Inventario</title>
</head>
<body>
    <div>
        <form action="crear_inventario.php" method="POST">
            <h1 class="tituloo"><b>Registro del Inventario</b></h1>
        <div>

        <input type="hidden" name="id_inventario" value="<?php echo $row['id_inventario']; ?>">
            <p>
            <label for="">ID Producto</label>
            <input type="number" name="id_producto">
            </p>
            <p>
            <label for="">Stock</label>
            <input type="number" name="stock">
            </p>
            <p>
            <label for="">Ubicacion</label>
            <input type="text" name="ubicacion">
            </p>
<br>
<br>
            <button type="submit" value="Guardar">GUARDAR</button>
            <button type="reset" value="Limpiar">LIMPIAR</button>
        </div>
        
        </form>
    </div>

    <div>
            <h3>Inventario Registrado</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID inventario</th>
                        <th>ID Producto</th>
                        <th>Stock</th>
                        <th>Ubicacion</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_inventario']?></td>
                        <td><?=$row['id_producto']?></td>
                        <td><?=$row['stock']?></td>
                        <td><?=$row['ubicacion']?></td>
                        <td><a href="actualizar_inventario.php?id_inventario=<?=$row['id_inventario']?>">EDITAR</a></td>
                        <td><a href="eliminar_inventario.php?id_inventario=<?=$row['id_inventario']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>