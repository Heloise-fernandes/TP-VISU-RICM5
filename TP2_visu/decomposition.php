<?php
require_once('./inputOutput.php');

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
		}
 		return [$tab_details, $tab_decompose];
	}

        $tab=read("herisson512.d");
        $res= decomposition($tab);
	$resultat = ['Moyenne'=>$res[0], 'Detail'=>$res[1]];
	echo json_encode($resultat);
?>
