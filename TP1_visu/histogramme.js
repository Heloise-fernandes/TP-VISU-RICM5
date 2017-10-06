$(document).ready(function() {

// la fonction qui permet de recuperer les details et de les sauvegarder dans une 
function requestHistogramme()
{   
	$.get('deconstruction.php',function(data){
			 		var res = JSON.parse(data);

				// le tableau contenant les details resultant de la decomposition 
				res0=res['decompo'];
				
				var mini=res0[0];
				var maxi=res0[0];
				//on recupere le maximum et le minimum  de notre tableau 
				for(var i = 0; i < res0.length-1; i++)
				{
					if(res0[i]>maxi)maxi=res0[i];
					if(res0[i]>mini)mini=res0[i];
				}
				alert(maxi);
				// on cree le tableau des abcisses. On decide de mettre 5 intervalles.  
				var abcisses=[];
				var nb_intervalle=5;
				var taille_intervalle=(maxi-mini)/nb_intervalle;

				//enfin on rempli ce dernier 
				for(var i = 0; i < res0.length-1; i++)
				{
					if(res0[i] > mini && res0[i] < mini+taille_intervalle)abcisses[0]=abcisses[0]+1;
					else if(res0[i] > mini+taille_intervalle && res0[i] < mini+2*taille_intervalle)
						abcisses[1]=abcisses[1]+1;
					else if(res0[i] > mini+2*taille_intervalle && res0[i] < mini+3*taille_intervalle)
						abcisses[2]=abcisses[2]+1;
					else if(res0[i] > mini && res0[i] < mini+4*taille_intervalle)abcisses[3]=abcisses[3]+1;
					else abcisses[4]=abcisses[4]+1;
				}
			
						    
	});

}
	requestHistogramme();
});
