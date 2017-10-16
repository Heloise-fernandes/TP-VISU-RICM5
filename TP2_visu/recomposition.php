<?php
	require_once './inputOutput.php';


	function recompositionUneEtape($moyenne, $detail)
	{
		$finalRes = [];
		$mod = sizeof($moyenne);
		for($i = 0; $i < sizeof($moyenne); $i++)
		{
			$finalRes[2*$i] = [ 
					'x' => (3/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (1/4) * ($moyenne[$i+1]['x'] %$mod - $detail[$i+1]['x'] %$mod) ,
					'y' => (3/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (1/4) * ($moyenne[$i+1]['y'] %$mod - $detail[$i+1]['y'] %$mod)
					];
			$finalRes[2*$i+1] = [ 
					'x' => (1/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (3/4) * ($moyenne[$i+1]['x'] %$mod - $detail[$i+1]['x'] %$mod) ,
					'y' => (1/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (3/4) * ($moyenne[$i+1]['y'] %$mod - $detail[$i+1]['y'] %$mod)
					];
		}
		return $finalRes;
	}

	function recomposition($moyenne, $detailFull)
	{
		$offset = 0;
		while($offset<sizeof($detailFull))
		{
			$detail = [];
			for($i = 0 ; $i < sizeof($moyenne); $i++)
			{
				$detail[$i] = $detailFull[$offset+$i];
			}

			$moyenne =  recompositionUneEtape($moyenne, $detail);
		}
		
		return $moyenne;
	}


	$moyenne = [];
	$detailFull = [];

	if( isset($_POST["moyenne"]) )
	{
		$moyenne = read($_POST["moyenne"]);
	}
	
	if( isset($_POST["detail"]) )
	{
		$detailFull = read($_POST["detail"]);
	}
	
	$resultat = recomposition($moyenne, $detailFull);
	
	echo json_encode($resultat);
?>