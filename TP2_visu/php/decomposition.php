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
			'y' => floatval((1/4)*(-$tab[(2*$i-2)%$count]['y']+3*$tab[(2*$i-1)%$count]['y']
						+3*$tab[(2*$i)%$count]['y']-$tab[(2*$i+1)%$count]['y'])) ];

			$tab_details[$i]=['x' => floatval((1/4)*($tab[(2*$i-2)%$count]['x']-3*$tab[(2*$i-1)%$count]['x']
						+3*$tab[(2*$i)%$count]['x']-$tab[(2*$i+1)%$count]['x'])), 
			'y' => floatval((1/4)*($tab[(2*$i-2)%$count]['y']-3*$tab[(2*$i-1)%$count]['y']
						+3*$tab[(2*$i)%$count]['y']-$tab[(2*$i+1)%$count]['y'])) ]; 		

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

  
    $res= decomposition($tab);

	$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[1]), 'detail'=> array_values($res[0])];
	write($resultat['moyenne'], "moyenne.d");
	write($resultat['detail'], "detail.d" );

	echo json_encode($resultat);
?>
