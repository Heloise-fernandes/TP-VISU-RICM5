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

	function decompositionRecompositionFull(name, numDecompo)
	{
		var nbR = 5;
		$.get('../php/decomposition.php?file=../sources_files/'+name,function(data){
			var res = JSON.parse(data);

			$.ajax({
				url: "../php/recomposition.php",
				type:"post",
				async: false,
				data: {
					moyenne: res['moyenne'],
					detail: res['detail'],
					nbRecompo : nbR,
				},
				success: function(dataPOST){   
					var reconstruit = JSON.parse(dataPOST);
					console.log(reconstruit.length);
					drawImage("canvasRecompo", reconstruit,20);
				},
				error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
			});

		});
	}	

	function decompositionSimple(numDecompo,name,idReq)
	{
		$.get('../php/decomposition.php?file=../sources_files/'+name+'&nDecompo='+numDecompo,function(data){
			//console.log(data);
			var res = JSON.parse(data);
			if(numDecompo==1){	drawImage("canvas"+(numDecompo-1),res['origin'],18);}
			drawImage("canvas"+numDecompo,res['moyenne'],18);
			
		});
	}

	function décomposition512Points(name)
	{
		var numTotal = 9;
		for(var i = 1; i < numTotal-1; i++ )
		{
			decompositionSimple(i,name,i);
		}
	}

	

	décomposition512Points('crocodile512.d');
	decompositionRecompositionFull('crocodile512.d', 5);
        

});
