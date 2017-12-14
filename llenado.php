<?php
	require("library.php");

	if(isset($_POST["campo"])){

			echo campos($_POST["campo"]);
	}
	function campos($campos){
		$datos=CargaFiltro($campos);
		return json_encode($datos);
	}
?>