$(document).ready(function() {


	//context.beginPath();
	function drawImage(idCanvas,tableaux)
	{
	    var canvas = document.getElementById(idCanvas);
	    var contexte = canvas.getContext("2d");
	    var h = canvas.height;
	    var w = canvas.width;
	    var coef = 20;

	    
	    var count = tableaux.length;

	    contexte.beginPath();
	    contexte.moveTo( tableaux[0].x *coef, (h - tableaux[0].y*coef));
 		for(var i = 1; i < count; i++)
 		{
 			contexte.lineTo( tableaux[i].x *coef, (h - tableaux[i].y*coef));
 		}
 		contexte.stroke();
	}
	
	function displayCroc()
	{
		 $.get('../php/decomposition.php?file=../sources_files/sh.d',function(data){
			var res = JSON.parse(data);
			drawImage("canvas",res['moyenne']);
			drawImage("canvasOrigin",res['origin']);

		});
	}

	

	displayCroc();
        

});
