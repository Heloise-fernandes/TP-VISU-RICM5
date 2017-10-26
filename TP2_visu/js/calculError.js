$(document).ready(function() {

	//calcul taux d'erreur en x et en y
	function calculErreur(reconstructError, reconstruct)
	{
		var tauxX = 0;
		var tauxY = 0;
		for(var i = 0; i < reconstruct.length; i++)
		{
			tauxX = tauxX + (reconstructError[i].x-reconstruct[i].x)*(reconstructError[i].x-reconstruct[i].x);
			tauxY = tauxY + (reconstructError[i].y-reconstruct[i].y)*(reconstructError[i].y-reconstruct[i].y);
		}
		return [tauxX/reconstruct.length,tauxY/reconstruct.length];
	}

	//ajouter un point au graphique
	function addNexPlot(plotData, tauxError, epsilon)
	{
		plotData[0].x.push(epsilon);
		plotData[0].x.sort();
		var position = plotData[0].x.indexOf(epsilon);
		plotData[0].y.splice(position, 0, tauxError[0]);

		plotData[1].x.push(epsilon);
		plotData[1].x.sort();
		var position = plotData[1].x.indexOf(epsilon);
		plotData[1].y.splice(position, 0, tauxError[1]);

		Plotly.purge('div')
		Plotly.newPlot('div', plotData);
	}

	//reconstruire pour chaque epsilon et ajouter le point
	function decompositionRecomposition(name, epsilon,plotData, reconstruct){
		
		$.get('../php/decomposition.php?file=../sources_files/'+name+"&epsilon="+epsilon,function(data){
			var res = JSON.parse(data);
			$.ajax({
				url: "../php/recomposition.php",
				type:"post",
				async: false,
				data: {
					moyenne: res['moyenne'],
					detail: res['detail'],
				},
				success: function(dataPOST){   
					var newPlot = calculErreur(JSON.parse(dataPOST), reconstruct);		
					addNexPlot(plotData, newPlot, epsilon);
				},
				error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
			});

		});
	}

	//l'ensemble des epsilons à calculer
	function calculErreurOther(name, reconstruit, plotData)
	{
		var epsilon = [1, 0.5, 0.1, 0.01, 0.005, 2, 0.75, 0.25,  0];
		for(var i = 0; i < epsilon.length; i++)
		{
			decompositionRecomposition(name, epsilon[i],plotData,reconstruit);
		}
	}

	//tableau reconstruit sans erreur
	function calculErreurGood(name, plotData)
	{
		$.get('../php/decomposition.php?file=../sources_files/'+name,function(data){
			var res = JSON.parse(data);
			$.ajax({
				url: "../php/recomposition.php",
				type:"post",
				async: false,
				data: {
					moyenne: res['moyenne'],
					detail: res['detail'],
				},
				success: function(dataPOST){   
					calculErreurOther(name,JSON.parse(dataPOST),plotData);		
					
				},
				error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
			});

		});
	}


	//init graph
	var data = [
    {
    	x: [],
    	y: [],
    	mode: 'lines+markers',
    	name:'error x',
  		type: 'scatter'
  	},
  	{
    	x: [],
    	y: [],
    	mode: 'lines+markers',
    	name:'error y',
  		type: 'scatter'
  	}];

  	var layout = {
	  title:'Taux d\' erreur en fonction d\'epsilon',
	};

	Plotly.newPlot('div', data,layout);
	var plotDiv = document.getElementById('div');
	var plotData = plotDiv.data;

	//calcul
	calculErreurGood('herisson512.d',plotData);
});	
