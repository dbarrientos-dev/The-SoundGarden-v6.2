<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Clientes</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_cliente=$_GET['id_cliente'];

$sql="SELECT * FROM clientes WHERE id_cliente='$id_cliente'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="./editar_cliente.php" method="post">
        <h1 class="tituloo"><b>Registro de Clientes</b></h1>
        <div class="form-grid">

            <p>
                <label for="">ID Cliente</label>
                <input type="text" name="id_cliente" value="<?php echo $row['id_cliente']; ?>">
            </p>
            <p>
                <label for="">Nombre</label>
                <input type="text" name="nombre" value="<?php echo $row['nombre']; ?>">
            </p>
            <p>
                <label for="">Apellido</label>
                <input type="text" name="apellido" value="<?php echo $row['apellido']; ?>">
            </p>
            <p>
                <label for="">Correo</label>
                <input type="email" name="email" value="<?php echo $row['email']; ?>">
            </p>
            <p>
                <label for="">Teléfono</label>
                <input type="number" name="telefono" value="<?php echo $row['telefono']; ?>">
            </p>
            <p>
                <label for="">Dirección</label>
                <input type="text" name="direccion" value="<?php echo $row['direccion']; ?>">
            </p>
            <p class="block1">
                <label for="">Ciudad</label>
                <input type="text" name="ciudad" value="<?php echo $row['ciudad']; ?>">
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