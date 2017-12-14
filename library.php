<?php

function cargarDatos(){
	$archivo=fopen("data-1.json","r");
	$data=fread($archivo, filesize('data-1.json'));
	$datos=json_decode($data,true);
	fclose($archivo);

	return $datos;
}

function CargaFiltro(campo,valor){
	$archivo = cargarDatos();

	foreach ($archivo as $key => $value) {
		# code...
	}
}


?>