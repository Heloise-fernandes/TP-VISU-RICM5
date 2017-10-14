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

	function write($tab)
	{
		$i = 0;
		$monfichier = fopen("fichierSinusDecompo.txt", "w");
		for ($i = 0; $i < sizeof($tab); $i++)
		{
			fputs($monfichier,$tab[$i]."\n");
		}
		fclose($monfichier);
	}

	function erreur_quadratique ($origine, $recompose){
		$err = 0;
		for ($i=0; $i < sizeOf($origine); $i++) { 
			$err = $err + ($origine[$i] - $recompose[$i])*($origine[$i] - $recompose[$i]);
		}
		$err = sqrt($err) / sizeOf($origine);
		return $err;
	};




	if( isset($_GET["recompo"]) ){ $recompo = $_GET["recompo"];}
	elseif( isset($_POST["recompo"]) ){ $recompo = $_POST["recompo"];}
	else { $recompo = read('tableau.txt');}

	if( isset($_GET["origin"]) ){ $origin = $_GET["origin"];}
	elseif( isset($_POST["origin"]) ){ $origin = $_POST["origin"];}
	else{ $origin = 0;}

	if( isset($_GET["nivDetail"]) ) { $nivDetail = $_GET["nivDetail"];}
	elseif( isset($_POST["nivDetail"]) ) { $nivDetail = $_POST["nivDetail"];}
	else { $nivDetail = 0;}


	$errQuad = erreur_quadratique($origin, $recompo);

	$resultat = ['recompo'=>$recompo, 'origin'=>$origin, 'nivDetail'=>$nivDetail, 'erreur_quadra'=>$errQuad];
	echo json_encode($resultat);


?>