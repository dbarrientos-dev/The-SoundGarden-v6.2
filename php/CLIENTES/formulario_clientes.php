<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM clientes";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Clientes</title>
</head>
<body>
    <div>
        <form action="crear_cliente.php" method="POST">
            <h1 class="tituloo"><b>Registro de Clientes</b></h1>
        <div>
            <p>
            <label for="">ID Cliente</label>
            <input type="number" name="id_cliente">
            </p>
            <p>
            <label for="">Nombre</label>
            <input type="text" name="nombre">
            </p>
            <p>
            <label for="">Apellido</label>
            <input type="text" name="apellido">
            </p>
            <p>
            <label for="">Correo Electronico</label>
            <input type="email" name="email">
            </p>
            <p>
            <label for="">Telefono</label>
            <input type="number" name="telefono">
            </p>
            <p>
            <label for="">Direccion</label>
            <input type="text" name="direccion">
            </p>
            <p>
            <p>
            <label for="">Ciudad</label>
            <input type="text" name="ciudad">
            </p>

<br>
<br>

            <button type="submit" value="Guardar">GUARDAR</button>
            <button type="reset" value="Limpiar">LIMPIAR</button>
        </div>
        
        </form>
    </div>

    <div>
            <h3>Clientes Registrados</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID cliente</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Ciudad</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_cliente']?></td>
                        <td><?=$row['nombre']?></td>
                        <td><?=$row['apellido']?></td>
                        <td><?=$row['email']?></td>
                        <td><?=$row['telefono']?></td>
                        <td><?=$row['direccion']?></td>
                        <td><?=$row['ciudad']?></td>
                        <td><a href="actualizar_cliente.php?id_cliente=<?=$row['id_cliente']?>">EDITAR</a></td>
                        <td><a href="eliminar_cliente.php?id_cliente=<?=$row['id_cliente']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>