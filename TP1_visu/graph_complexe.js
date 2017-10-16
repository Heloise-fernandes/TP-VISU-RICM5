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
				  name: 'Courbe d\'origine',
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

		 		var name =  'Courbe après '+reso+' décompositions'

	            var trace1 = {
				  x: tabAbscisse,
				  y: moy,
				  name: name,
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

	function requesterreurs(tabAbscisse)
	{
		var detail = 1;
		//var nivDetail = [0.1,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.01];
		var nivDetail = [1,0.1,0.01,0.001,0.0001,0.00001,0.000001,0.0000001,0.00000001,0.000000001];
		var erreurs=[];
		for (var i =0; i < 10; i++){
			detail = nivDetail[i];

			$.ajax({
				url: "deconstruction.php",
		        type:"post",
		        async: false,
		        data: {
		            file: 'fichierSinus.txt',
		            nivDetail: detail
		        },
		        success: function(data){
		        	var resdec = JSON.parse(data);
					var decompo = resdec['decompo'];

					$.ajax({
				        url: "reconstruction.php",
				        type:"post",
				        async: false,
				        data: {
				            decompo: decompo
				        },
				        success: function(data){
				        	var resrec = JSON.parse(data);
				        	var origin = resrec['origin'];
				        	var recompo = resrec['recompo'];

				        	$.ajax({
						        url: "erreur.php",
						        type:"post",
						        async: false,
						        data: {
						            recompo: recompo,
						            origin: origin,
						            nivDetail: nivDetail[i]
						        },
						        success: function(data){   
						        	var err = JSON.parse(data);
						        	console.log(err);

									erreurs[i] = err['erreur_quadra'];
						        },
						        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("erreur.php","fail");}
						    });
				        },
				        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
				    });
		        },
		        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("decomposition.php","fail");}
			});			
		};
		//log = [0,1,2,3,4,5,6,7,8,9];
		log = [0,-1,-2,-3,-4,-5,-6,-7,-8,-9];
		var trace = {
			x: log,
			y: erreurs,
			type:'scatter'
		};
		var layout = {
			xAxis: {
				type: 'log',
				autorange: true
			}
		};
		Plotly.newPlot('ErreursDetail',[trace], layout);
	};



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

	//Erreur en fonction du niveau de détail

	ErreursDetail = document.getElementById('ErreursDetail');



	requesterreurs(x);



});
