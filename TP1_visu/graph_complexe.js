$(document).ready(function() {

	function requestGetOrigine(tabAbscisse)
	{
		$.get('deconstruction.php?file=fichierSinus.txt',function(data){
		 		var res = JSON.parse(data);
		 		//console.log(data);
	            //res['origin'];
	            //res['decompo'];
				
	            var trace1 = {
				  x: tabAbscisse,
				  y: res['origin'],
				  type: 'scatter'
				};

				var data = [trace1];

				Plotly.newPlot('tabOrigine', data);

		});

	}

	function requestdecomporeconstr(tabAbscisse)
	{
		$.get('deconstruction.php?file=fichierSinus.txt',function(data){
		 		var res = JSON.parse(data);
		 		//console.log(data);
	            //res['origin'];
	            //res['decompo'];
				
	            var trace1 = {
				  x: tabAbscisse,
				  y: res['origin'],
				  type: 'scatter'
				};

				var data = [trace1];

				Plotly.newPlot('tabOrigine', data);

		});

	}

	//-1.0, 1.0, num=2000

	var x = [];
	var offset = 2/2048;
	var value = -1;
	for (var i = 0; i <2000; i++) {
		x[i]= value
		value+=offset;
	}

	requestGetOrigine(x)
	requestdecomporeconstr(x)


	//requestDecompose();




});