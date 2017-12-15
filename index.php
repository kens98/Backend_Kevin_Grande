<?php

require('library.php');
if(isset($_POST['tipo'])){

	if($_POST['tipo']=="todos"){
		$info=null;
		$datos=cargarDatos();
		echo json_encode($datos);

	}
	if($_POST['tipo']=="filtro"){
		$ciudad=$_POST['ciudad'];
		$tipo=$_POST['selecttipo'];
		$menor=$_POST['menor'];
		$mayor=$_POST['mayor'];

		$infor=null;
		$infor=cargarDatos();
		$data=array();
		$precio=null;
		for($i=0;$i<count($infor);$i++){
			$precio=str_replace('$','',str_replace(',','',str_replace(' ','',$infor[$i]["Precio"])));
			// filtro con todas las caracteristicas
			if($precio>=$menor && $precio<=$mayor && $infor[$i]["Ciudad"]==$ciudad && $infor[$i]["Tipo"]==$tipo){
				array_push($data, $infor[$i]);
			}
			// filtro con Precios, Ciudad, sin Tipo
			else if($precio>=$menor && $precio<=$mayor && $infor[$i]["Ciudad"]==$ciudad && ""==$tipo){
				array_push($data, $infor[$i]);
			}
			// filtro con Precios, Tipo, sin Ciudad
			else if($precio>=$menor && $precio<=$mayor && ""==$ciudad && $infor[$i]["Tipo"]==$tipo){
				array_push($data, $infor[$i]);
			}
			else if($precio>=$menor && $precio<=$mayor && ""==$ciudad && ""==$tipo){
				array_push($data, $infor[$i]);
			}
			
		}
		echo json_encode($data);
	}
}
else{
	echo 'post';
}

?>