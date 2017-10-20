<?php
require_once('./inputOutput.php');

	//$tab = [];
	//$i = 0;
	/*Ouvre le fichier et retourne un tableau contenant une ligne par élément*/
	//$lines = file($path);
	/*On parcourt le tableau $lines et on affiche le contenu de chaque ligne précédée de son numéro*/
	//foreach ($lines as $lineNumber => $lineContent)
	//{
	//	$slipLine = explode(" ", $lineContent);
	//	$tab[$i] = ['x' => floatval($slipLine[0]), 'y' => floatval($slipLine[1]) ];
	//	$i++;
	//}

	//return $tab;


	function decomposition($tab)
	{
		$tab_decompose=[];
		$tab_details=[];
		$count = sizeof($tab);
        for ($i = 1; $i < $count; $i++) 
		{
			
			$tab_decompose[$i]=['x' => floatval((1/4)*(-$tab[(2*$i-2)%$count]['x']+3*$tab[(2*$i-1)%$count]['x']
						+3*$tab[(2*$i)%$count]['x']-$tab[(2*$i+1)%$count]['x'])), 
			'y' => floatval((1/4)*($tab[(2*$i-2)%$count]['y']+3*$tab[(2*$i-1)%$count]['y']
						+3*$tab[(2*$i)%$count]['y']-$tab[(2*$i+1)%$count]['y'])) ];

			$tab_details[$i]=['x' => floatval((1/4)*($tab[(2*$i-2)%$count]['x']-3*$tab[(2*$i-1)%$count]['x']
						+3*$tab[(2*$i)%$count]['x']-$tab[(2*$i+1)%$count]['x'])), 
			'y' => floatval((1/4)*($tab[(2*$i-2)%$count]['y']-3*$tab[(2*$i-1)%$count]['y']
						+3*$tab[(2*$i)%$count]['y']-$tab[(2*$i+1)%$count]['y'])) ]; 		
			/*$tab_decompose[$i] = ['x' => 1, 'y' => 1];

			$tab_details[$i] = ['x' => 1, 'y' => 1];*/
		}
 		return [$tab_details, $tab_decompose];
	}

	if( isset($_GET["file"]) )
	{
		$tab = read($_GET["file"]);
	}
	else
	{
		$tab = read('../sources_files/crocodile512.d');	
	}

    //$tab=read("../sources_files/herisson512.d");
    $res= decomposition($tab);
   // $resultatMoy = $res[1];
	
	$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[1]), 'detail'=> array_values($res[0])];
	//var_dump($resultat);
	//print_r($resultat);
	echo json_encode($resultat);
?>
