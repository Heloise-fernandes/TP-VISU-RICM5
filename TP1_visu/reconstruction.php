<?php

	function recomposition($x, $y) 
	{
		$reconstructed = array();
		$indMax = sizeof($x);
		for ($i=0;$i<$indMax;$i++){
			$reconstructed[$i*2] = $x[$i]+$y[$i];
			$reconstructed[$i*2+1] = $x[$i]-$y[$i]; 
		}
		return $reconstructed;
	}



	function recompositionFull($values, $resmin)
	{
		$N = $resmin+1;
		while ($N < sizeof($values)) 
		{
			for ($i=0; $i<$N; $i++){
				$x[$i] = $values[$i];
				$y[$i] = $values[$i+$N];
			
				$rec = recomposition($x, $y);
				for ($i=0; $i<$N*2; $i++){
					$values[$i] = $rec[$i];
				}
				$N = $N*2;
			}
			return $values;
		}
	}



	if( isset($_GET["decompo"]) )
	{
		$tab = json_decode($_GET["decompo"]);
	}
	else if( isset($_POST["decompo"]) )
	{
		$tab = json_decode($_POST["decompo"]);
	}
	else
	{
		$tab = [0,0,0,0];
	}

	if( isset($_GET["res"]) )
	{
		$resmin = $_GET["res"];
	}
	else if ( isset($_POST["res"]) )
	{
		$resmin = json_decode($_POST["res"]);
	}
	else
	{
		$resmin = 0	;
	}
	$res = recompositionFull($tab, $resmin);

	$resultat = ['recompo'=>$res, 'origin'=>$tab, 'resolution_de_deb'=>$resmin];
	echo json_encode($resultat);

?>