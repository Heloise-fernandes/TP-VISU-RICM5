<?php
require_once('./inputOutput.php');


	function decomposition_totale($tab){
		/* premiere decomposition du tableau*/
		$details=[];
		$res=[];
		$res=decomposition($tab,$details);

		while(sizeof($res[0]) > 4){
			$res=decomposition($res[0],$res[1]);
		}
		 return $res;
	}



	function decomposition($tab,$details)
	{
		$tab_decompose=[];
		$count = sizeof($tab);
		// la taille du tableau details (on rajoute les details au fur et a mesure
		$tbs=sizeof($details);
		/* on calcule les points a probleme afin d'eviter de faire le modulo*/
		$tab_decompose[0]=['x' => (-$tab[$count-2]['x']+3.0*($tab[$count-1]['x']
						+$tab[0]['x'])-$tab[1]['x'])/4.0, 
						
				'y' => (-$tab[$count-2]['y']+3.0*($tab[$count-1]['y']
						+$tab[0]['y'])-$tab[1]['y'])/4.0 ];
			//calcul des premiers details 
			$details[$tbs]=['x' => floatval(($tab[$count-2]['x']+3*(-$tab[$count-1]['x']
						+$tab[0]['x'])-$tab[1]['x'])/4.0), 
					'y' => floatval(($tab[$count-2]['y']+3*(-$tab[$count-1]['y']
						+$tab[0]['y'])-$tab[1]['y'])/4.0) ];	
						
        for ($i = 1; $i < $count/2; $i++) 
		{
			$tab_decompose[$i]=['x' => floatval(-$tab[2*$i-2]['x']+floatval(3.0*($tab[2*$i-1]['x']
						+$tab[2*$i]['x']))-$tab[2*$i+1]['x'])/4.0, 
						
					'y' => floatval(-$tab[2*$i-2]['y']+floatval(3.0*($tab[2*$i-1]['y']
						+$tab[2*$i]['y']))-$tab[2*$i+1]['y'])/4.0 ];
			  		
			$details[$i+$tbs]=['x' => floatval(($tab[2*$i-2]['x']+3*(-$tab[2*$i-1]['x']
						+$tab[2*$i]['x'])-$tab[2*$i+1]['x'])/4.0), 
			'y' => floatval(($tab[2*$i-2]['y']+3*(-$tab[2*$i-1]['y']
						+$tab[2*$i]['y'])-$tab[2*$i+1]['y'])/4.0) ]; 
			
		}
 		return [$tab_decompose ,$details];
	}

	if( isset($_GET["file"]) )
	{
		
		$tab = read($_GET["file"]);
	}
	else
	{
		
		$tab = read('../sources_files/herisson512.d');	
	}
	//$detail=[];
    $res= decomposition_totale($tab);
	$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[0]), 'detail'=> array_values($res[1])];
	echo json_encode($resultat);
	
?>
