<?php

function cargarDatos(){
	$archivo=fopen("data-1.json","r");
	$data=fread($archivo, filesize('data-1.json'));
	$datos=json_decode($data,true);
	fclose($archivo);

	return $datos;
}

function CargaFiltro($campo){
	$archivo = cargarDatos();
	$infor= [];
	foreach ($archivo as $key => $value) {
		$distinto=true;
		/*foreach($infor as $key1 => $value1){
			if($value[$campo] == $value1[$key1]){
				$distinto=false;
			}
		}
		if($distinto){
			array_push($infor, $value[$key][$campo]);
		}*/
		array_push($infor, $value[$campo]);
		
	}

	return array_unique($infor);
		
}


?>