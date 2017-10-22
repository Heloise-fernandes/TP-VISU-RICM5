
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
			
			$x = null;
			$y = null;
			for($j=0;$j<sizeof($slipLine);$j++)
			{
				if($slipLine[$j]!=' ')
				{
					if($x!=null){$y = $slipLine[$j];}
					else{$x = $slipLine[$j];}
				}
			}
			$tab[$i] = ['x' => floatval($x), 'y' => floatval($y) ];
			$i++;
		}

		return $tab;
	}

	function write($tab, $name)
	{
		$i = 0;
		/*Ouvre le fichier et retourne un tableau contenant une ligne par élément*/
		$monfichier = fopen("../sources_files/".$name, "w");
		/*On parcourt le tableau $lines et on affiche le contenu de chaque ligne précédée de son numéro*/
		for ($i = 0; $i < sizeof($tab); $i++)
		{
			fputs($monfichier,$tab[$i]['x']." ".$tab[$i]['y']."\n");
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
		$tab = read('../sources_files/crocodile512.d');	
	}

	//$resultat = [];
	
	//echo json_encode($tab);

?>
