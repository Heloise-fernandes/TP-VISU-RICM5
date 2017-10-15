$(document).ready(function() {

	function requesterreurs(tabAbscisse)
	{
		var detail = 1;
		//var nivDetail = [0.1,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.01];
		var nivDetail = [1,0.1,0.01,0.001,0.0001];
		var erreurs=[];
		for (var i =0; i < 5; i++){
			detail = nivDetail[i];
			//console.log(detail);
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
					//console.log(resdec);

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
				        	//console.log(resrec);

				        	$.ajax({
						        url: "../php/erreur.php",
						        type:"post",
						        async: false,
						        data: {
						            recompo: recompo,
						            origin: origin,
						            nivDetail: nivDetail[i]
						        },
						        success: function(data){   
						        	var err = JSON.parse(data);
						        	//console.log(err);

									erreurs[i] = err['erreur_quadra'];
						        },
						        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
						    });
				        },
				        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
				    });
		        },
		        error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("??? ?? ?????? ??????? ????","fail");}
			});			
		};
		au = [0,1,2,3,4,5,6,7,8,9];
		au = [0,-1,-2,-3,-4];
		var trace = {
			x: au,
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

	requesterreurs(x);

	var niv = 0;
	recompoErreur(x, niv);
	niv = 0.1
	for(var i = 0; i < 2; i++)
	{
		recompoErreur(x, niv);
		niv = niv/10;
	}
	recompoErreur(x, 0.05);
});