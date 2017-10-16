
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
			$slipLine = explode(" ", $lineContent);
			$tab[$i] = ['x' => floatval($slipLine[0]), 'y' => floatval($slipLine[1]) ];
			$i++;
		}

		return $tab;
	}

	function write($tab)
	{
		$i = 0;
		/*Ouvre le fichier et retourne un tableau contenant une ligne par élément*/
		$monfichier = fopen("fichierSinusDecompo.txt", "w");
		/*On parcourt le tableau $lines et on affiche le contenu de chaque ligne précédée de son numéro*/
		for ($i = 0; $i < sizeof($tab); $i++)
		{
			fputs($monfichier,$tab[$i]."\n");
			//fputs($monfichier,"blop");
		}
		fclose($monfichier);
	}

	$tab = [];
	if( isset($_GET["file"]) )
	{
		$tab = read($_GET["file"]);
	}
	else
	{
		$tab = read('crocodile512.d');	
	}

	$resultat = [];
	
	//echo json_encode($resultat);

?>
