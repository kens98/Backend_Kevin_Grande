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
		array_push($infor, $value[$campo]);
		
	}

	return $infor;
		
}
function CargarFiltroValor($campo, $valor,$opcion){
	$datos=cargarDatos();
	$infor=[];
	foreach ($datos as $key => $value) {
			
		foreach($value as $key1 => $value1){
			$cp=array_search($value[$key1], $value);

			if($cp==$campo){
				if($opcion=="="){
					if($value1==$valor){
						array_push($infor, $datos[$key]);
					}
				}
				elseif($opcion==">"){
					if(floatval(str_replace("$","",str_replace(",","",$value1)))>=floatval($valor)){
						array_push($infor, $datos[$key]);
					}
				}
				elseif($opcion=="<"){
					if(floatval(str_replace("$","",str_replace(",","",$value1)))<=floatval($valor)){
						array_push($infor, $datos[$key]);
					}
				}
			}
		}
	}
	return $infor;
}

function CargarFiltroValores($DataAnterior,$campo,$valor,$opcion){
	$datos=$DataAnterior;
	$infor=[];
	foreach ($datos as $key => $value) {
			
		foreach($value as $key1 => $value1){
			$cp=array_search($value[$key1], $value);
		
			if($cp==$campo){
				if($opcion=="="){
					if($value1==$valor){
						array_push($infor, $datos[$key]);
					}
				}
				elseif($opcion==">"){
					if(floatval(str_replace("$","",str_replace(",","",$value1)))>=floatval($valor)){
						array_push($infor, $datos[$key]);
					}
				}
				elseif($opcion=="<"){
					if(floatval(str_replace("$","",str_replace(",","",$value1)))<=floatval($valor)){
						array_push($infor, $datos[$key]);
					}
				}
			}
		}
	}
	return $infor;
}


?>