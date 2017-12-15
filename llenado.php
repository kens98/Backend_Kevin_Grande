<?php
	require("library.php");

	if(isset($_POST["campo"])){

			echo campos($_POST["campo"]);
	}
	function campos($campos){
		$datos=array_unique(CargaFiltro($campos));
		return json_encode($datos);
	}
?>