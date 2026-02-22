<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM productos";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Productos</title>
</head>
<body>
    <div>
        <form action="crear_producto.php" method="POST">
            <h1 class="tituloo"><b>Registro de Productos</b></h1>
        <div>
            
            <input type="hidden" name="id_producto" value="<?php echo $row['id_producto']; ?>">
            <p>
            <label for="">Nombre Producto</label>
            <input type="text" name="nom_producto">
            </p>
            <p>
            <label for="">Id categoria</label>
            <input type="number" name="id_categoria">
            </p>
            <p>
            <label for="">Marca</label>
            <input type="text" name="marca">
            </p>
            <p>
            <label for="">Precio</label>
            <input type="number" name="precio">
            </p>
            <p>
            <label for="">Descripcion</label>
            <input type="text" name="descripcion">
            </p>
            <p>
            <label for="">Id Proveedor</label>
            <input type="number" name="id_proveedor">
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
                        <th>ID Producto</th>
                        <th>Nombre del Producto</th>
                        <th>ID Categoria</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>ID proveedor</th>

                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_producto']?></td>
                        <td><?=$row['nom_producto']?></td>
                        <td><?=$row['id_categoria']?></td>
                        <td><?=$row['marca']?></td>
                        <td><?=$row['precio']?></td>
                        <td><?=$row['descripcion']?></td>
                        <td><?=$row['id_proveedor']?></td>
                        <td><a href="actualizar_producto.php?id_producto=<?=$row['id_producto']?>">EDITAR</a></td>
                        <td><a href="eliminar_producto.php?id_producto=<?=$row['id_producto']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>