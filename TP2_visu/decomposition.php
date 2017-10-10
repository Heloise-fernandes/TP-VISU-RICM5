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

       

?>
