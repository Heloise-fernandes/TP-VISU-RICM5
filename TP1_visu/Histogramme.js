// la fonction qui permet de recuperer les details et de les sauvegarder dans une 
function requestHistogramme()
{
	$.get('deconstruction.php',function(data){
			 		var res = JSON.parse(data);
				// le tableau contenant les details resultant de la decomposition 
				res0(res['decompo']);
				

						    
	});

}
