<?php
	require_once './inputOutput.php';


	function recompositionUneEtape($moyenne, $detail)
	{
		$finalRes = [];
		$mod = sizeof($moyenne);
		for($i = 0; $i < sizeof($moyenne); $i++)
		{
			if($i == sizeof($moyenne)-1 )
			{
				$finalRes[2*$i] = [ 
					'x' => (3/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (1/4) * ($moyenne[0]['x'] - $detail[01]['x']) ,
					'y' => (3/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (1/4) * ($moyenne[0]['y'] - $detail[0]['y'])
					];
				$finalRes[2*$i+1] = [ 
						'x' => (1/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (3/4) * ($moyenne[0]['x'] - $detail[0]['x']) ,
						'y' => (1/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (3/4) * ($moyenne[0]['y'] - $detail[0]['y'])
						];
			}
			else
			{
				$finalRes[2*$i] = [ 
					'x' => (3/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (1/4) * ($moyenne[$i+1]['x'] - $detail[$i+1]['x']) ,
					'y' => (3/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (1/4) * ($moyenne[$i+1]['y'] - $detail[$i+1]['y'])
					];
				$finalRes[2*$i+1] = [ 
						'x' => (1/4) * ($moyenne[$i]['x'] + $detail[$i]['x']) + (3/4) * ($moyenne[$i+1]['x'] - $detail[$i+1]['x']) ,
						'y' => (1/4) * ($moyenne[$i]['y'] + $detail[$i]['y']) + (3/4) * ($moyenne[$i+1]['y'] - $detail[$i+1]['y'])
						];
			}
			
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
		$moyenne = $_POST["moyenne"];
	}
	else
	{
		$moyenne = read('../sources_files/moyenne.d');	
	}
	
	if( isset($_POST["detail"]) )
	{
		$detailFull = $_POST["detail"];
	}
	else
	{
		$detailFull = read('../sources_files/detail.d');	
	}
	
	$resultat = recompositionUneEtape($moyenne, $detailFull);
	
	echo json_encode($resultat);
?>