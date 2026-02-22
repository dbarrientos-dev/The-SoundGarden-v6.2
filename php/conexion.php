<?php
function conexion() 
{
    $host='localhost';
    $user='root';
    $pass='';
    $bd='base_datos_proyecto';

    $conexion=mysqli_connect($host,$user,$pass,$bd);
    mysqli_select_db($conexion,$bd);

    return $conexion;
}
