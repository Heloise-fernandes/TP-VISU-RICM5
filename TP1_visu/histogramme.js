$(document).ready(function() {

// la fonction qui permet de recuperer les details et de les sauvegarder dans une 
function requestHistogramme()
{   
	$.get('deconstruction.php',function(data){
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
				Plotly.newPlot('myDiagramme', data, layout);	
	    
	});

}
	requestHistogramme();
});
