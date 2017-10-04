



$(document).ready(function() {

	function res0(tab)
	{

        var trace = {
        	x : [4],
		    y : tab[0],
		    width: [4],
		    type: 'bar',
		};

		var data = [trace];

		var layout = {
		  	title: 'Résolution 0',
			gap :0
		};

		Plotly.newPlot('dataRES0', data, layout);
	}

	function res1(tab)
	{

        var y = [];
        for(var i = 0; i < 2; i++)
        {
        	y[i] = tab[i];
        }

        var trace = {
        	x : [1,3],
		    y : y,
		    width: [2,2],
		    type: 'bar',
		};

		var data = [trace];

		var layout = {
		  	title: 'Résolution 1',
			gap :0
		};

		Plotly.newPlot('dataRES1', data, layout);
	}

	function res2(tab)
	{
		var x = [];
        for(var i = 0; i < tab.length+1; i++)
        {
        	x[i-1] = i;
        }

        var trace = {
        	x : x,
		    y : tab,
		    width: [1,1,1,1],
		    type: 'bar',
		};

		var data = [trace];

		var layout = {
		  	title: 'Données d\'origine',
		};


		Plotly.newPlot('dataRES2', data, layout);
	}

	function requestDecompose()
	{


		$.get('deconstruction.php',function(data){
		 		var res = JSON.parse(data);

	            res2(res['origin']);
	            res0(res['decompo']);
					    
		});

		$.get('deconstruction.php?res=1',function(data){
		 		var res = JSON.parse(data);
	            res1(res['decompo']);
					    
		});
	}

	requestDecompose();




});