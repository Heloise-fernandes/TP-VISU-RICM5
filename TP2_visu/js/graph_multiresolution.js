$(document).ready(function() {


	//context.beginPath();
	function drawImage(idCanvas,tableaux,coef)
	{
	    var canvas = document.getElementById(idCanvas);
	    var contexte = canvas.getContext("2d");
	    var h = canvas.height;
	    var w = canvas.width;

	    contexte.beginPath();
	    contexte.moveTo( (w/2 -tableaux[0].x *coef), (h/2 - tableaux[0].y*coef));
 		for(var i = 1; i < tableaux.length; i++)
 		{
 			contexte.lineTo( (w/2 -tableaux[i].x *coef), (h/2 - tableaux[i].y*coef));
 		}
 		contexte.lineTo( (w/2 -tableaux[0].x *coef), (h/2 - tableaux[0].y*coef));
 		contexte.stroke();
	}

	function decompositionRecomposition(name, epsilon, i)
	{
		$.get('../php/decomposition.php?file=../sources_files/'+name+"&epsilon="+epsilon,function(data){
			var res = JSON.parse(data);
			console.log(res['moyenne'].length);
			console.log(res['detail'].length);
			$.ajax({
				url: "../php/recomposition.php",
				type:"post",
				async: false,
				data: {
					moyenne: res['moyenne'],
					detail: res['detail'],
				},
				success: function(dataPOST){   
					//console.log(reconstruit);
					var reconstruit = JSON.parse(dataPOST);
					
					drawImage("canvas"+i, reconstruit,20);
				},
				error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
			});

		});
	}

	function loadErrorFiles()
	{
		var epsilon = [1, 0.5, 0.1, 0.01];
		for(var i = 0; i < epsilon.length; i++)
		{
			//decompositionRecomposition('crocodile512.d', epsilon[i],i);
			decompositionRecomposition('crocodile512.d', epsilon[i],i);
		}
	}

	loadErrorFiles();
	
});	
