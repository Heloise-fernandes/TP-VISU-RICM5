$(document).ready(function() {

	function requesterreurs(nivDetails,lay, graph)
	{
		var detail = 1;
		var erreurs=[];
		for (var i =0; i < nivDetails.length; i++){
			detail = nivDetails[i];

			$.ajax({
				url: "../php/deconstruction.php",
		        type:"post",
		        async: false,
		        data: {
		            file: '../sources_files/fichierSinus.txt',
		            nivDetail: detail
		        },
		        success: function(data){
		        	var resdec = JSON.parse(data);
					var decompo = resdec['decompo'];

					$.ajax({
				        url: "../php/reconstruction.php",
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
						        url: "../php/erreur.php",
						        type:"post",
						        async: false,
						        data: {
						            recompo: recompo,
						            origin: origin,
						            nivDetail: nivDetails[i]
						        },
						        success: function(data){   
						        	var err = JSON.parse(data);
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
		var trace = {
			x: nivDetails,
			y: erreurs,
			type:'scatter'
		};
		console.log(lay);
		Plotly.newPlot(graph,[trace], lay);
	};

	function recompoErreur(tabAbscisse, detail)
	{
		$.get('../php/deconstruction.php?file=../sources_files/fichierSinus.txt&nivDetail='+detail,function(data){
		 		var res = JSON.parse(data);
				var decompo = res['decompo'];
				console.log(detail);
				console.log(res['decompo']);

			    $.ajax({
			        url: "../php/reconstruction.php",
			        type:"post",
			        async: false,
			        data: {
			            decompo: decompo
			        },
			        success: function(data){   

			        	var res = JSON.parse(data);
			        	//console.log(res['recompo']);
			            var trace1 = {
						  x: tabAbscisse,
						  y: res['recompo'],
						  name:'Reconstruction niveau de Détail = '+detail,
						  type: 'scatter'
						};

						Plotly.addTraces(graphRecompoErreur,trace1);

			        },
			        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
			    });
		});
	};

	var TailleTableau = 2048
	var x = [];
	var offset = 2/TailleTableau;
	var value = -1;
	for (var i = 0; i <TailleTableau; i++) {
		x[i]= value
		value+=offset;
	}

	var layout = {
					title:'Reconstruction avec erreur',
					legend: {"orientation": "h"}
				};

	Plotly.newPlot('tabReconstruct', [],layout);
	var graphRecompoErreur = document.getElementById('tabReconstruct');

	var niveauxDetails = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.01, 0];
	var layout = {};
	requesterreurs(niveauxDetails,layout,'ErreursDetail');

	var niveauxDetails2 = [1,0.1,0.01,0.001,0.0001,0.00001,0.000001,0.0000001,0.00000001,0.000000001];
	var layout2 = {
		xaxis: {
		type: 'log',
		autorange: true
		}
	};
	requesterreurs(niveauxDetails2,layout2,'ErreursDetail2');


	var niv = [0, 0.01, 0.05, 0.1, 0.5, 1];
	for(var i = 0; i < niv.length; i++)
	{
		recompoErreur(x, niv[i]);
	}
});