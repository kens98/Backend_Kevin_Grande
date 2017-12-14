<?php

require('library.php');

if($_POST['tipo']=="todos"){
	$info=null;
	$datos=cargarDatos();
	echo json_encode($datos);


}



?>