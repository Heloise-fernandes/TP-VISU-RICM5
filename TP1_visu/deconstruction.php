
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
			$tab[$i] = floatval($lineContent);
			$i++;
		}
		return $tab;
	}

	function write($tab)
	{
		$i = 0;
		$monfichier = fopen("fichierSinusDecompo.txt", "w");
		for ($i = 0; $i < sizeof($tab); $i++)
		{
			fputs($monfichier,$tab[$i]."\n");
		}
		fclose($monfichier);
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


	function decompositionDetails($values, $NivDetail)
	{
		$yindice = [];
		$xindice = [];

		for($i= 0; $i < sizeof($values)/2; $i++)
		{
			$xindice[$i] = ($values[2*$i] + $values[2*$i+1])/2;
			$yindice[$i] = $values[2*$i] - $xindice[$i];
			if ($yindice[$i] <  $NivDetail && $yindice[$i] > (-$NivDetail))
			{
				$yindice[$i] = 0;
			}
		}
		return [$xindice, $yindice];
	}

	function decompositionFull($tab, $reso_min)
	{
		
		$finalIndice = sizeof($tab);
		$resMax = log(sizeof($tab),2)/log(2,2);
		$finalTab = [];

		while( $finalIndice>1 && $resMax>$reso_min )
		{
			//Un niveau de décomposition
			$res = decompositionSimple($tab);
			$xindice = $res[0]; $yindice = $res[1];
			
			//on change l'indice de fin de tableau et le prochain tableau à décomposer
			$finalIndice = sizeof($xindice);
			$tab = $xindice;

			//on ajoute le tableau de détail au debut du tableau
			$finalTab = array_merge($yindice,$finalTab);

			//on décrémente la résolution
			$resMax--;
		}
		//on ajoute le tableau de moyenne en début de tableau
		$finalTab = array_merge($tab,$finalTab);
		return $finalTab;

	}
	
	function decompositionFullDetails($tab, $NivDetail)
	{
		$finalIndice = sizeof($tab);
		$k = 0;
		$finalTab = array();
		while($finalIndice>1)
		{
			$res = decompositionDetails($tab, $NivDetail);
			$xindice = $res[0];
			$yindice = $res[1];
			$k++;
			$finalIndice = sizeof($xindice);
			$tab = $xindice;
			$finalTab = array_merge($yindice,$finalTab);
		}
		$finalTab = array_merge($tab,$finalTab);
		return $finalTab;

	}

	

 	
	if( isset($_GET["file"]) ) {$tab = read($_GET["file"]);}
	elseif (isset($_POST["file"]) ) {$tab = read($_POST["file"]);}
	else {$tab = read('tableau.txt');	}

	if( isset($_GET["res"]) ) {$resmin = $_GET["res"];}
	elseif (isset($_POST["res"]) ) {$tab = read($_POST["res"]);}
	else {$resmin = 0	;}

	if( isset($_GET["nivDetail"]) ){ 
		$nivDetail = $_GET["nivDetail"]; 
		$res = decompositionFullDetails($tab, $nivDetail);
	}
	elseif(isset($_POST["nivDetail"]) ){ 
		$nivDetail = $_POST["nivDetail"]; 
		$res = decompositionFullDetails($tab, $nivDetail);
	}
	else {
		$nivDetail = NULL; 
		$res = decompositionFull($tab, $resmin);
	}

	$resultat = ['decompo'=>$res, 'origin'=> $tab, 'resolution'=>$resmin, 'nivDetail'=>$nivDetail];

	echo json_encode($resultat);
?>
