<?php
require_once('./inputOutput.php');
	function decomposition_totale($tab,$decompo,$erreur, $epsilon){
		/* premiere decomposition du tableau*/
		$details=[];
		$res=[];		
		$etapeDecompo = 1;
		if($erreur){$res=decompositionErreur($tab,$details,$epsilon);}
		else{$res=decomposition($tab,$details);}
		while(sizeof($res[0]) > 4 && $decompo > $etapeDecompo){
			
			if($erreur){$res=decompositionErreur($res[0],$res[1],$epsilon);}
			else{$res=decomposition($res[0],$res[1]);}
			
			$etapeDecompo++;
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
		$tab_decompose[0]=[
				'x' => (-$tab[$count-2]['x']+3.0*($tab[$count-1]['x']+$tab[0]['x'])-$tab[1]['x'])/4.0, 		
				'y' => (-$tab[$count-2]['y']+3.0*($tab[$count-1]['y']+$tab[0]['y'])-$tab[1]['y'])/4.0 ];
			//calcul des premiers details 
			$details[$tbs]=[
				'x' => floatval(($tab[$count-2]['x']+3*(-$tab[$count-1]['x']+$tab[0]['x'])-$tab[1]['x'])/4.0), 
				'y' => floatval(($tab[$count-2]['y']+3*(-$tab[$count-1]['y']+$tab[0]['y'])-$tab[1]['y'])/4.0) ];	
						
        for ($i = 1; $i < $count/2; $i++) 
		{
			$tab_decompose[$i]=[
				'x' => floatval(-$tab[2*$i-2]['x']+floatval(3.0*($tab[2*$i-1]['x']+$tab[2*$i]['x']))-$tab[2*$i+1]['x'])/4.0, 
				'y' => floatval(-$tab[2*$i-2]['y']+floatval(3.0*($tab[2*$i-1]['y']+$tab[2*$i]['y']))-$tab[2*$i+1]['y'])/4.0 ];
			  		
			$details[$i+$tbs]=[
				'x' => floatval(($tab[2*$i-2]['x']+3*(-$tab[2*$i-1]['x']+$tab[2*$i]['x'])-$tab[2*$i+1]['x'])/4.0), 
				'y' => floatval(($tab[2*$i-2]['y']+3*(-$tab[2*$i-1]['y']+$tab[2*$i]['y'])-$tab[2*$i+1]['y'])/4.0) ]; 	
		}
 		return [$tab_decompose ,$details];
	}
	function decompositionErreur($tab,$details,$epsilon)
	{
		$tab_decompose=[];
		$count = sizeof($tab);
		// la taille du tableau details (on rajoute les details au fur et a mesure
		$tbs=sizeof($details);
		/* on calcule les points a probleme afin d'eviter de faire le modulo*/
		$tab_decompose[0]=[
				'x' => (-$tab[$count-2]['x']+3.0*($tab[$count-1]['x']+$tab[0]['x'])-$tab[1]['x'])/4.0, 		
				'y' => (-$tab[$count-2]['y']+3.0*($tab[$count-1]['y']+$tab[0]['y'])-$tab[1]['y'])/4.0 ];
			//calcul des premiers details 
			$details[$tbs]=[
				'x' => floatval(($tab[$count-2]['x']+3*(-$tab[$count-1]['x']+$tab[0]['x'])-$tab[1]['x'])/4.0), 
				'y' => floatval(($tab[$count-2]['y']+3*(-$tab[$count-1]['y']+$tab[0]['y'])-$tab[1]['y'])/4.0) ];	
			if(abs($details[$tbs]['x'])<$epsilon){$details[$tbs]['x']=0;}
			if(abs($details[$tbs]['y'])<$epsilon){$details[$tbs]['y']=0;}
        for ($i = 1; $i < $count/2; $i++) 
		{
			$tab_decompose[$i]=[
				'x' => floatval(-$tab[2*$i-2]['x']+floatval(3.0*($tab[2*$i-1]['x']+$tab[2*$i]['x']))-$tab[2*$i+1]['x'])/4.0, 
				'y' => floatval(-$tab[2*$i-2]['y']+floatval(3.0*($tab[2*$i-1]['y']+$tab[2*$i]['y']))-$tab[2*$i+1]['y'])/4.0 ];
			  		
			$details[$i+$tbs]=[
				'x' => floatval(($tab[2*$i-2]['x']+3*(-$tab[2*$i-1]['x']+$tab[2*$i]['x'])-$tab[2*$i+1]['x'])/4.0), 
				'y' => floatval(($tab[2*$i-2]['y']+3*(-$tab[2*$i-1]['y']+$tab[2*$i]['y'])-$tab[2*$i+1]['y'])/4.0) ]; 
			if(abs($details[$i+$tbs]['x'])<$epsilon){$details[$i+$tbs]['x']=0;}	
			if(abs($details[$i+$tbs]['y'])<$epsilon){$details[$i+$tbs]['y']=0;}
		}
 		return [$tab_decompose ,$details];
	}
        	
	function decomposition_Modification_Elements($tab,$decompo,$modif){
		/* premiere decomposition du tableau*/
		$details=[];
		$res=[];		
		$etapeDecompo = 1;
		$res=decomposition($tab,$details);
		while(sizeof($res[0]) > 4 && $decompo > $etapeDecompo){
			
			$res=decomposition($res[0],$res[1]);
			
			$etapeDecompo++;
		}
		$resDecomp=$res[0];
		for($i=0;$i<sizeof($resDecomp);$i++){
			$changement = rand(0,20)-10;
			$resDecomp[$i]['x'] = $resDecomp[$i]['x']+($changement*$modif)/10;
			$resDecomp[$i]['y'] = $resDecomp[$i]['y']+($changement*$modif)/10;
		}
		return [$resDecomp,$res[1]];
		
	}
	

	if( isset($_GET["file"]) )
	{
		
		$tab = read($_GET["file"]);
	}
	else
	{
		
		$tab = read('../sources_files/crocodile512.d');	
	}
	if( isset($_GET["nDecompo"]) )
	{
		$numDecompo = $_GET["nDecompo"];
	}
	else
	{
		$numDecompo = log(sizeof($tab),2)/log(2,2)-2;
	}
	if($numDecompo==0)
	{
		$resultat = ['origin'=>$tab,'moyenne'=> array_values($tab), 'detail'=> array_values([]), 'nbDecompo'=> $numDecompo];
	}
	else if(isset($_GET["epsilon"]))
	{
		$epsilon = $_GET["epsilon"];
		$res= decomposition_totale($tab,$numDecompo,true,$epsilon);
		$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[0]), 'detail'=> array_values($res[1]), 'nbDecompo'=> $numDecompo];
	}
	else if(isset($_GET["modif"]))
	{
		$modif = $_GET["modif"];
		$res=decomposition_Modification_Elements($tab,$numDecompo,$modif);
		$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[0]), 'detail'=> array_values($res[1]), 'nbDecompo'=> $numDecompo];
	}
	else
	{
		$res= decomposition_totale($tab,$numDecompo,false,null);
		$resultat = ['origin'=>$tab,'moyenne'=> array_values($res[0]), 'detail'=> array_values($res[1]), 'nbDecompo'=> $numDecompo];
	}
    
	/*write($resultat['moyenne'], "moyenne.d");
	write($resultat['detail'], "detail.d" );*/
	echo json_encode($resultat);
	
?>
