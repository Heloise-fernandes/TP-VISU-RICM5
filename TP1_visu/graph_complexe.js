$(document).ready(function() {

	function requestDecompose(tabAbscisse)
	{


		$.get('deconstruction.php?file=fichierSinus.txt',function(data){
		 		var res = JSON.parse(data);

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
	var offset = 2/2000;
	var value = -1;
	for (var i = 0; i <2000; i++) {
		x[i]= value
		value+=offset;
	}

	console.log(offset);
	console.log(x);


	//requestDecompose();




});