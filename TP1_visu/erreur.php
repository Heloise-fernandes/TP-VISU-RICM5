<?php 

	function erreur_quadratique ($origine, $recompose){
		$err = 0;
		for ($i=0; $i < sizeOf($origine); $i++) { 
			$err = $err + ($origine[$i] - $recompose[$i])*($origine[$i] - $recompose[$i]);
		}
		$err = sqrt($err) / sizeOf($origine);
		return $err;
	};




	if( isset($_GET["recompo"]) ){ $recompo = read($_GET["recompo"]);}
	else { $recompo = read('origin.txt');}

	if( isset($_GET["origiread('origin.txt');"]) ){ $origin = $_GET["origin"];}
	else{ $origin = 0;}

	if( isset($_GET["nivDetail"]) ) { $nivDetail = $_GET["nivDetail"];}
	else { $nivDetail = 0;}

	$errQuad = erreur_quadratique($origine, $recompo);

	$resultat = ['recompo'=>$recompo, 'origin'=>$origin, 'nivDetail'=>$nivDetail, 'erreur_quadra'=>$errQuad];
	echo json_encode($resultat);


?>