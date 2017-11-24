<?php
	require_once './inputOutput.php';


	function recompositionUneEtape($moyenne, $detail)
	{
		$finalRes = [];

		for($i = 0; $i < sizeof($moyenne); $i++)
		{
			if($i == sizeof($moyenne)-1 )
			{
				$finalRes[2*$i] = [ 
						'x' => 0.75 * ($moyenne[$i]['x'] + $detail[$i]['x']) + 0.25 * ($moyenne[0]['x'] - $detail[0]['x']) ,
						'y' => 0.75 * ($moyenne[$i]['y'] + $detail[$i]['y']) + 0.25 * ($moyenne[0]['y'] - $detail[0]['y'])
						];
				$finalRes[2*$i+1] = [ 
						'x' => 0.25 * ($moyenne[$i]['x'] + $detail[$i]['x']) + 0.75 * ($moyenne[0]['x'] - $detail[0]['x']) ,
						'y' => 0.25 * ($moyenne[$i]['y'] + $detail[$i]['y']) + 0.75 * ($moyenne[0]['y'] - $detail[0]['y'])
						];
			}
			else
			{
				$finalRes[2*$i] = [ 
						'x' => 0.75 * ($moyenne[$i]['x'] + $detail[$i]['x']) + 0.25 * ($moyenne[$i+1]['x'] - $detail[$i+1]['x']) ,
						'y' => 0.75 * ($moyenne[$i]['y'] + $detail[$i]['y']) + 0.25 * ($moyenne[$i+1]['y'] - $detail[$i+1]['y'])
						];
				$finalRes[2*$i+1] = [ 
						'x' => 0.25 * ($moyenne[$i]['x'] + $detail[$i]['x']) + 0.75 * ($moyenne[$i+1]['x'] - $detail[$i+1]['x']) ,
						'y' => 0.25 * ($moyenne[$i]['y'] + $detail[$i]['y']) + 0.75 * ($moyenne[$i+1]['y'] - $detail[$i+1]['y'])
						];
			}
			
		}
		return $finalRes;
	}

	function recomposition($moyenne, $detailFull)
	{
		$offset = 0;
		$res = $moyenne;
		

		while($offset<sizeof($detailFull))
		{
			$detail = extractDetail($detailFull, sizeof($res), $offset);
			$offset = $offset + sizeof($res);
			$res =  recompositionUneEtape($res, $detail);
		}
		
		return $res;
	}

	function recompositionNum($moyenne, $detailFull,$nbRecompo)
	{
		$offset = 0;
		$res = $moyenne;
		$nbDeRecomposition = 0;
		
		if($nbRecompo==null){$nbRecompo=sizeof($moyenne);}

		while($offset<sizeof($detailFull) && $nbDeRecomposition<$nbRecompo)
		{
			$detail = extractDetail($detailFull, sizeof($res), $offset);
			$offset = $offset + sizeof($res);
			$res =  recompositionUneEtape($res, $detail);
			$nbDeRecomposition++;
		}
		
		return $res;
	}

	function extractDetail($detailFull, $size, $offset)
	{
		$detail = [];
		$j = 0;
		for($i = sizeof($detailFull)-$offset-$size ; $i < sizeof($detailFull)-$offset; $i++)
		{
			//echo "".$j.", ".$i."\n";
			$detail[$j] = $detailFull[$i];
			$j++;
		}
		return $detail;
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
	
	if( isset($_POST["nbRecompo"]))
	{
		$nbRecompo = $_POST["nbRecompo"];
		$resultat = recompositionNum($moyenne, $detailFull,$nbRecompo);
	}
	else
	{
		$resultat = recomposition($moyenne, $detailFull);
	}

	//$d = extractDetail($detailFull,4,0);
	//$resultat = recompositionUneEtape($moyenne, $d);
	
	
	
	echo json_encode($resultat);
?>