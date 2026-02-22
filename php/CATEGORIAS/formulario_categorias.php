<?php
include'../conexion.php';
$conexion=conexion();

$sql="SELECT * FROM categorias";
$query=mysqli_query($conexion,$sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilo_formularios.css">

    <title>Formulario Categorias</title>
</head>
<body>
    <div>
        <form action="crear_categorias.php" method="POST">
            <h1 class="tituloo"><b>Registro de Categorias</b></h1>
        <div>

        <input type="hidden" name="id_categoria" value="<?php echo $row['id_categoria']; ?>">
            <p>
            <label for="">Nombre Categoria</label>
            <input type="text" name="nom_categoria">
            </p>
            <p>
            <label for="">Descripcion</label>
            <input type="text" name="descripcion">
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
                        <th>ID categoria</th>
                        <th>Nombre Categoria</th>
                        <th>Descripcion</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_array($query)) : ?>
                        <tr>
                        <td><?=$row['id_categoria']?></td>
                        <td><?=$row['nom_categoria']?></td>
                        <td><?=$row['descripcion']?></td>
                        <td><a href="actualizar_categorias.php?id_categoria=<?=$row['id_categoria']?>">EDITAR</a></td>
                        <td><a href="eliminar_categorias.php?id_categoria=<?=$row['id_categoria']?>">ELIMINAR</a></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    
</body>
</html>