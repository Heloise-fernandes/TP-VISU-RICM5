
<?php

	function read($path)
	{
		$tab = [];
		$i = 0;
		/*Ouvre le fichier et retourne un tableau contenant une ligne par élément*/
	$lines = file($path);
	/*On parcourt le tableau $lines et on affiche le contenu de chaque ligne précédée de son numéro*/
	foreach ($lines as $lineNumber => $lineContent)
	{
		$tab[$i] = intval($lineContent);
		$i++;
	}
	return $tab;
	}

	function decompositionSimple($tab)
	{
		$yindice = [];
		$xindice = [];

		for($i= 0; $i < sizeof($tab)/2; $i++)
		{
			$xindice[$i] = ($tab[2*$i] + $tab[2*$i+1])/2;
			$yindice[$i] = $tab[2*$i] - $xindice[$i];
		}
		return [$xindice, $yindice];
	}

	function decompositionFull($tab, $reso_min)
	{
		$finalIndice = sizeof($tab);
		$resMax = sqrt(sizeof($tab));
		$finalTab = [];

		while($finalIndice>1 && $resMax>$reso_min )
		{
			$res = decompositionSimple($tab);
			$xindice = $res[0];
			$yindice = $res[1];
			$resMax--;
			$finalIndice = sizeof($xindice);
			$tab = $xindice;
			$finalTab = array_merge($yindice,$finalTab);
		}
		$finalTab = array_merge($tab,$finalTab);
		return $finalTab;

	}

 	
	if( isset($_GET["file"]) )
	{
		$tab = read($_GET["file"]);
	}
	else
	{
		$tab = read('tableau.txt');	
	}

	if( isset($_GET["res"]) )
	{
		$resmin = $_GET["res"];
	}
	else
	{
		$resmin = 0	;
	}
	$res = decompositionFull($tab, $resmin);

	$resultat = ['decompo'=>$res, 'origin'=>$tab, 'resolution_de_fin'=>$resmin];
	echo json_encode($resultat);
?>

