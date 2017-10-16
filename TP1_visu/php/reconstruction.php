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
		$N = pow(2,$resmin);
		while ($N < sizeof($values)) 
		{
			for ($i=0; $i<$N; $i++){
				$x[$i] = $values[$i];
				$y[$i] = $values[$i+$N];	
			}
			$rec = recomposition($x, $y);
			for ($j=0; $j<$N*2; $j++){
				$values[$j] = $rec[$j];

			}
			$N = $N*2;
			
		}
		return $values;
	}

	function read($path)
	{
		$tab = [];
		$i = 0;
		/*Ouvre le fichier et retourne un tableau contenant une ligne par élément*/
		$lines = file($path);
		/*On parcourt le tableau $lines et on affiche le contenu de chaque ligne précédée de son numéro*/
		foreach ($lines as $lineNumber => $lineContent)
		{
			$tab[$i] = floatval($lineContent);
			$i++;
		}
		return $tab;
	}

	if( isset($_GET["decompo"]) ){$tab = json_decode($_GET["decompo"]);}
	else if( isset($_POST["decompo"]) ){$tab = $_POST["decompo"];}
	else{$tab = read("../sources_files/fichierSinusDecompo.txt");}

	if( isset($_GET["origin"]) ){$origin = json_decode($_GET["origin"]);}
	else if( isset($_POST["origin"]) ){$origin = $_POST["origin"];}
	else{$origin = read("../sources_files/fichierSinus.txt");}

	if( isset($_GET["res"]) ){$resmin = $_GET["res"];}
	else if ( isset($_POST["res"]) ){$resmin = json_decode($_POST["res"]);}
	else{$resmin = 0;}

	$res = recompositionFull($tab, $resmin);

	$resultat = ['recompo'=>$res, 'origin'=>$origin, 'resolution'=>$resmin];
	echo json_encode($resultat);
?>
