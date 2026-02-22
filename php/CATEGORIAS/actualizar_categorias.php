<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">
    <title>Actualizar Categorias</title>
</head>
<body>

<?php
include"../conexion.php";
$conexion=conexion();

$id_categoria=$_GET['id_categoria'];

$sql="SELECT * FROM categorias WHERE id_categoria='$id_categoria'";
$query=mysqli_query($conexion, $sql);
$row=mysqli_fetch_array($query);
?>

<div class="contact-form">
    <form action="editar_categorias.php" method="post">
        <h1 class="tituloo"><b>Registro de Categorias</b></h1>
        <div class="form-grid">

        <input type="hidden" name="id_categoria" value="<?php echo $row['id_categoria']; ?>">

            <p>
                <label for="">Nombre Categoria</label>
                <input type="text" name="nom_categoria" value="<?php echo $row['nom_categoria']; ?>">
            </p>
            <p>
                <label for="">Descripcion</label>
                <input type="text" name="descripcion" value="<?php echo $row['descripcion']; ?>">
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