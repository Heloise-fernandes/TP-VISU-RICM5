$(document).ready(function() {

	var TailleTableau = 2048

	function orginCourbe(yTab)
	{

		var tabAbscisse = [];
		var offset = 2/TailleTableau;
		var value = -1;
		for (var i = 0; i <TailleTableau; i++) {
			tabAbscisse[i]= value
			value+=offset;
		}

		var deconstruction = {
    		x: tabAbscisse,
			y: yTab,
			type: 'scatter'
		};

		var data = [deconstruction];

		var layout = {
		  title: 'Courbe d\'origine'
		};
		
		Plotly.newPlot('courbe', data, layout);
	}
	// la fonction qui permet de recuperer les details et de les sauvegarder dans une 
	function requestHistogramme()
	{   
		$.get('../php/deconstruction.php?file=../sources_files/fichierAlea.txt',function(data){
				 	var res = JSON.parse(data);

					// le tableau contenant les details resultant de la decomposition 
					res0=res['decompo'];
					var res1=[];
					for(var i=0;i<res0.length-1;i++){
					   res1[i]=Math.abs(res0[i]);
					}

					var trace1 = {
					  x: res1,
					  type: 'histogram'
					};

					var data = [trace1];

					var layout = {
					  title: 'Diagramme des valeurs absolues '
					};
					
					Plotly.newPlot('detailHisto', data, layout);	

					orginCourbe(res['origin']);	
		});

	}
	requestHistogramme();
});
