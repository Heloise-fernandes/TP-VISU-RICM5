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

				var decompo = res['decompo']
			    $.ajax({
			        url: "reconstruction.php",
			        type:"post",
			        async: false,
			        data: {
			            decompo: decompo
			        },
			        success: function(data){   
			        	console.log(data);
			        	//$('#tabReconstruct').html(data)
			        	var res = JSON.parse(data);
					
			            var trace1 = {
						  x: tabAbscisse,
						  y: res['recompo'],
						  type: 'scatter'
						};

						var data = [trace1];

						Plotly.newPlot('tabReconstruct', data);  

			        },
			        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
			    });
		});

		

	}

	//-1.0, 1.0, num=2048

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