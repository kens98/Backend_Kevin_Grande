<?php

require('library.php');
if(isset($_POST['tipo'])){

	if($_POST['tipo']=="todos"){
		$info=null;
		$datos=cargarDatos();
		echo json_encode($datos);

	}
	if($_POST['tipo']=="filtroCiudad"){
		$info=null;
		$datos=cargarDatos();
		echo json_encode($datos);
	}
	if($_POST['tipo']=="filtroTipo"){
		$info=null;
		$datos=cargarDatos();
		echo json_encode($datos);
	}
	if($_POST['tipo']=="filtroPrecio"){
		$menor=$_POST['valormenor'];
		$mayor=$_POST['valormayor'];
		$datos=CargarFiltroValor("Precio",$menor,">");
		$datosfiltrados=CargarFiltroValores($datos,"Precio",$mayor,"<");
		//echo json_encode($datos);
		echo json_encode($datosfiltrados);
	}
}
else{
	echo 'post';
}

?>