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

	function decompositionRecomposition(name, modif, i)
	{
		$.get('../php/decomposition.php?file=../sources_files/'+name+"&modif="+modif,function(data){
			var res = JSON.parse(data);
			console.log(res['moyenne'].length);
			console.log(res['detail'].length);
			drawImage("deconstruit"+i, res['moyenne'],20);
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
					
					drawImage("reconstruit"+i, reconstruit,20);
				},
				error:function(xhr, ajaxOptions, thrownError){alert(xhr.responseText); ShowMessage("recomposition.php","fail");}
			});

		});
	}

	function loadErrorFiles()
	{
		var modif = [0, 3, 2, 1];
		for(var i = 0; i < modif.length; i++)
		{
			decompositionRecomposition('crocodile512.d', modif[i],i);
		}
	}

	loadErrorFiles();
        

});
