$(document).ready(function() {

	var graphOrigine = [];
	var grapheRecompo = [];

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

				Plotly.addTraces(graphOrigine,trace1);
		});

	}

	function requestGetDecompoDétail(tabAbscisse, reso, totalSize)
	{
		var exposant = Math.log(reso)/Math.log(2);
		var offset = tabAbscisse.length / reso;
		
		$.get('deconstruction.php?file=fichierSinus.txt&res='+exposant,function(data){
		 		var res = JSON.parse(data);
		 		
		 		var moy  = [];
		 		var x = 0
		 		for(var i = 0; i < reso; i++)
		 		{
		 			for(var j = 0; j < offset; j++)
		 			{	
		 				moy[x+j] = res['decompo'][i];
		 			}
		 			x +=offset
		 		}

	            var trace1 = {
				  x: tabAbscisse,
				  y: moy,
				  type: 'scatter'
				};

				Plotly.addTraces(graphOrigine,trace1);
		});

	}

	function requestdecomporeconstr(tabAbscisse)
	{

		$.get('deconstruction.php?file=fichierSinus.txt',function(data){
		 		var res = JSON.parse(data);
				var decompo = res['decompo'];
				var about=escape( $("#editorAbout").text());
			    $.ajax({
			        url: "reconstruction.php",
			        type:"post",
			        async: false,
			        data: {
			            decompo: decompo
			        },
			        success: function(data){   
			        	//console.log(data);
			        	//$('#tabReconstruct').html(data)
			        	var res = JSON.parse(data);
					
			            var trace1 = {
						  x: tabAbscisse,
						  y: res['recompo'],
						  type: 'scatter'
						};

						Plotly.addTraces(grapheRecompo,trace1);

			        },
			        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
			    });
		});

	}

	var TailleTableau = 2048
	//-1.0, 1.0, num=2048
	Plotly.newPlot('tabOrigine', []);
	Plotly.newPlot('tabReconstruct', []);

	graphOrigine = document.getElementById('tabOrigine');
	grapheRecompo = document.getElementById('tabReconstruct');

	var x = [];
	var offset = 2/TailleTableau;
	var value = -1;
	for (var i = 0; i <TailleTableau; i++) {
		x[i]= value
		value+=offset;
	}
	requestGetOrigine(x)
	requestdecomporeconstr(x)

	requestGetDecompoDétail(x, TailleTableau/32, TailleTableau)

	requestGetDecompoDétail(x, TailleTableau/128, TailleTableau)

	requestGetDecompoDétail(x, TailleTableau/512, TailleTableau)


	//requestDecompose();




});
