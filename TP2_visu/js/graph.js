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

	function decompositionRecomposition(name, numRecompo)
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
					nbRecompo : numRecompo,
				},
				success: function(dataPOST){   
					//console.log(reconstruit);
					var reconstruit = JSON.parse(dataPOST);
					
					drawImage("recompo"+numRecompo, reconstruit,20);
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

	function recomposition512Points(name)
	{
		var numTotal = 7;
		for(var i = 1; i <= numTotal; i++ )
		{
			decompositionRecomposition(name,i);
			//recompo0
		}
	}

	

	décomposition512Points('crocodile512.d');
	recomposition512Points('crocodile512.d');
	//décomposition512Points('sh.d');
	//recomposition512Points('sh.d');
        

});
