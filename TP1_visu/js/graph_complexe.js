$(document).ready(function() {

	var file = '../sources_files/fichierAlea.txt'
	
	/*Décompose un tableau et recupère le tableau d'orine renvoyé avec le tableau décomposé*/
	function requestGetOrigine(tabAbscisse)
	{
		$.get('../php/deconstruction.php?file='+file,function(data){
		 		var res = JSON.parse(data);

	            var trace1 = {
				  x: tabAbscisse,
				  y: res['origin'],
				  name: 'Courbe d\'origine, niveau de résolution : 11',
				  type: 'scatter'
				};

				var layout = {
					title:'Sinus de 2048 valeurs = 11 niveaux de résolution avant décomposition totale',
					legend: {"orientation": "h"}
				};

				Plotly.relayout(graphOrigine, layout);
				Plotly.addTraces(graphOrigine,trace1);
				Plotly.addTraces(grapheRecompo,trace1);
		});

	}

	/* décompose un tableau jusqu'à un certain niveaux de détail*/
	function requestGetDecompoDétail(tabAbscisse, reso, totalSize)
	{
		var exposant = Math.log(reso)/Math.log(2);
		var offset = tabAbscisse.length / reso;
		
		$.get('../php/deconstruction.php?file='+file+'&res='+exposant,function(data){
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

		 		var name =  'Niveau de décomposition : ' + exposant

	            var trace1 = {
				  x: tabAbscisse,
				  y: moy,
				  name: name,
				  type: 'scatter'
				};

				Plotly.addTraces(graphOrigine,trace1);
		});

	}

	/*Décompose et recompose un tableaux*/
	function requestdecomporeconstr(tabAbscisse)
	{

		$.get('../php/deconstruction.php?file='+file,function(data){
		 		var res = JSON.parse(data);
				var decompo = res['decompo'];
				var about=escape( $("#editorAbout").text());
			    $.ajax({
			        url: "../php/reconstruction.php",
			        type:"post",
			        async: false,
			        data: {
			            decompo: decompo
			        },
			        success: function(data){   

			        	var res = JSON.parse(data);
					
			            var trace1 = {
						  x: tabAbscisse,
						  y: res['recompo'],
						  name:'Reconstruction sans niveau de Détail',
						  type: 'scatter'
						};

						Plotly.addTraces(grapheRecompo,trace1);

			        },
			        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
			    });
		});

	}

	var TailleTableau = 2048

	//initaliser les graphiques
	Plotly.newPlot('tabOrigine', []);
	Plotly.newPlot('tabReconstruct', []);
	var graphOrigine = document.getElementById('tabOrigine');
	var grapheRecompo = document.getElementById('tabReconstruct');

	//initialiser le tableau des abscisses
	var x = [];
	var offset = 2/TailleTableau;
	var value = -1;
	for (var i = 0; i <TailleTableau; i++) {
		x[i]= value
		value+=offset;
	}
	

	//afficher tableau d'origine
	requestGetOrigine(x)

	//afficher tableau reconstruit
	requestdecomporeconstr(x)

	//afficher tableaux partiellement décomposé
	requestGetDecompoDétail(x, TailleTableau/16, TailleTableau)
	requestGetDecompoDétail(x, TailleTableau/64, TailleTableau)
	requestGetDecompoDétail(x, TailleTableau/256, TailleTableau)
	requestGetDecompoDétail(x, TailleTableau/1024, TailleTableau)

});
